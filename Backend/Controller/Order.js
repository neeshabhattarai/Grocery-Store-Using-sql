const OrederSchema = require('../Model/OrderItem');
const HttpError = require('../Helper/HttpError');
const Order = require('../Model/Order');
const User = require('../Model/UserSchema');
const natural = require('natural');
const CartItemSchema = require('../Model/CartItem');
const Cart = require('../Model/Cart');
const sequelize = require('../Model/Database');
const ProductModel = require('../Model/ProductSchema');
const { where } = require('sequelize');

const GetAllOrder = async (req, res, next) => {
  try {
    const OrderDetail = await Order.findAll({
      include: [
        {
          model: ProductModel,
          through: ["quantity"]
        },
        {
          model: User,
          attributes: ["name"]
        }
      ]
    });
    res.json({ message: OrderDetail });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not get order details"));
  }
};

const PostOrder = async (req, res, next) => {
  const id = req.params.id;
  const { transaction_uuid } = req.body;

  const Transaction = await sequelize.transaction();

  try {
    const CartDetails = await Cart.findByPk(id, {
      include: [
        {
          model: ProductModel,
          through: {
            model: CartItemSchema,
            attributes: ["quantity", "rating"]
          }
        }
      ],
      transaction: Transaction
    });

    const CartDetail = CartDetails.get();
    const productsInCart = CartDetail.products;

    const UserData = await Order.create({
      userUserid: req.UserData.user
    }).then(res => res.get());

    for (let Product of productsInCart) {
      const quantity = Product.cartItem?.quantity || 0;
      const rating = Product.cartItem?.rating || 0;

      await OrederSchema.create(
        {
          orderId: UserData.id,
          productProId: Product.pro_id,
          transactionid: transaction_uuid,
          quantity: quantity,
          rating: rating
        },
        { transaction: Transaction }
      );

      await CartItemSchema.destroy({
        where: {
          cartId: id,
          productProId: Product.pro_id
        },
        transaction: Transaction
      });
    }

    await Transaction.commit();
    return res.status(200).json({ message: "Order successfully placed." });
  } catch (error) {
    await Transaction.rollback();
    return next(new HttpError(error.message || "Something went wrong"));
  }
};

const GetOrder = async (req, res, next) => {
  try {
    const OrderDetail = await Order.findAll({
      where: { userUserid: req.UserData.user },
      include: {
        model: ProductModel,
        through: { attributes: ["quantity", "transactionid"] }
      }
    });
    res.json({ message: OrderDetail });
  } catch (error) {
    return next(new HttpError("Could not fetch Order Details"));
  }
};

const DeleteOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const orders = await Order.findAll({
      where: { userUserid: req.UserData.user },
      transaction: t
    });

    const orderIds = orders.map(order => order.id);

    if (orderIds.length === 0) {
      await t.commit();
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    await OrederSchema.destroy({
      where: { orderId: orderIds },
      transaction: t
    });

    await Order.destroy({
      where: { id: orderIds },
      transaction: t
    });

    await t.commit();
    res.status(200).json({ message: 'All orders and related details deleted.' });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: 'An error occurred while deleting orders.' });
  }
};

const Reccomendation = async (req, res, next) => {
  try {
    const OrderDetail = await Order.findAll({
      where: { userUserid: req.UserData.user },
      include: {
        model: ProductModel,
        through: { attributes: ["quantity", "rating"] }
      }
    });

    if (!OrderDetail.length) {
      return res.json({ message: "No orders found for user." });
    }

    const ProductDetails = [];
    OrderDetail.forEach(order => {
      order.products.forEach(product => {
        ProductDetails.push({
          pro_id: product.pro_id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          categoryCatId: product.categoryCatId,
          rating: product.orderItem.rating
        });
      });
    });

    if (!ProductDetails.length) {
      return res.json({ message: "No products found in orders." });
    }

    const AllProduct = await ProductModel.findAll();
    if (!AllProduct.length) {
      return res.json({ message: "No products in database." });
    }

    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();

    const ratedDescriptions = ProductDetails.filter(p => p.rating > 0);
    if (!ratedDescriptions.length) {
      return res.json({ message: "No rated products to base recommendation on." });
    }

    ratedDescriptions.forEach(p => {
      tfidf.addDocument(p.description ? p.description.toLowerCase() : '');
    });

    const recommendations = [];

    AllProduct.forEach(product => {
      const description = product.description ? product.description.toLowerCase() : '';
      let similarityScore = 0;

      for (let i = 0; i < tfidf.documents.length; i++) {
        const likedTerms = tfidf.listTerms(i).map(t => t.term);
        likedTerms.forEach(term => {
          const termFreq = (description.match(new RegExp(`\\b${term}\\b`, 'g')) || []).length;
          if (termFreq > 0) {
            similarityScore += tfidf.tfidf(term, i);
          }
        });
      }

      if (similarityScore > 0) {
        recommendations.push({
          pro_id: product.pro_id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          categoryCatId: product.categoryCatId,
          score: similarityScore
        });
      }
    });

    const userProductIds = ProductDetails.map(p => p.pro_id);
    const finalRecommendations = recommendations.filter(
      rec => !userProductIds.includes(rec.pro_id)
    );

    finalRecommendations.sort((a, b) => b.score - a.score);

    res.json({
      message: finalRecommendations.length ? finalRecommendations : "No similar products found."
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  PostOrder,
  GetOrder,
  GetAllOrder,
  DeleteOrder,
  Reccomendation
};
