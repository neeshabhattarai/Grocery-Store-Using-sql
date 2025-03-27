class HttpError extends Error{
    constructor(message,Errorcode){
        super(message);
        this.code=Errorcode;
    }
}
module.exports=HttpError;