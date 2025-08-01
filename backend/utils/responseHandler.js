export const successResponse = (res,statusCode,message,data={})=>{
    res.status(statusCode).send({success:true,message,data})
}

export const errorResponse =(res,statusCode,message,error = null)=>{
    console.log(error)
    res.status(statusCode).send({message,success:false,error:error?error.message:null})
    
}
