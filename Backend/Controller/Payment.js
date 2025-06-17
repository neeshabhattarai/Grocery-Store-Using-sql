 const HttpError = require("../Helper/HttpError");
const Payment=require("../Model/Payment");
const stripe=require('stripe')('your secret code');
const PaymentRegister=(req,res,next)=>{
    const {transaction_uuid,total_amount}=req.body;
    const user=req.UserData.user;
    console.log(req.body);
    Payment.create({
transactionId:transaction_uuid,
amount:total_amount,
userUserid:user
    })

}
const PaymentByStripe = async (req, res) => {
  console.log("Hello from payment");

  const { products, id } = req.body.orderData.message;
  const TotalAmount = req.body.totalPrice;

  console.log(req.body);

  const line_items = products.map((val) => ({
    price_data: {
      currency: "npr",
      product_data: {
        name: val.name,
      },
      unit_amount: val.price * 100, // Stripe uses paisa, not rupees
    },
    quantity: val.cartItem.quantity,
  }));

  try {
    // Optional: Create a Stripe customer if needed
    // const customer = await stripe.customers.create({
    //   email: req.UserData.email,
    //   metadata: { userId: req.UserData.user },
    // });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items, 
      mode: "payment",
      
      success_url: `http://localhost:5173/user/payment/bystripe?session_id={CHECKOUT_SESSION_ID}`, // ✅ correct session ID
      cancel_url: "http://localhost:5173/user/home",
      metadata: {
        orderId: id,
        user:req.UserData.user // optional: helps track the order later
      },
    });

    console.log("Stripe session created:", session.id);
    res.json({
      message: {
        id: session.id,
      },
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Payment session creation failed" });
  }
};

const PaymentSuccess = async (req, res) => {
  try {
    const session_id = req.query.session_id;
    const sessionDetails = await stripe.checkout.sessions.retrieve(session_id);

    const { id, amount_total, payment_status, metadata } = sessionDetails;
    const total_amount = Number.parseInt(amount_total) / 100;
    const userId = metadata.user;
    const cartId = metadata.orderId;
    const transaction_uuid=id;
    await Payment.create({
      method:"stripe",
      userUserid:userId,
      transactionId:transaction_uuid,
      amount:total_amount
    })


    console.log(total_amount,cartId,transaction_uuid);

    res.json({
      message:{total_amount,transaction_uuid,cartId}
    });
  } catch (error) {
    console.error("Error in PaymentSuccess:", error);
   
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const PaymentDetails=async(req,res,next)=>{
   
    const user=req.UserData.user;
    console.log(user);
    try {
       const payment= await Payment.findAll({where:{userUserid:user}});
      //  console.log(payment);
       res.json({
        message:payment
       })
    } catch (error) {
        next( HttpError("failed transaction"))
    }
   
}
module.exports={
    PaymentDetails,PaymentRegister,PaymentByStripe,PaymentSuccess
}