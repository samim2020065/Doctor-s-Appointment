import jwt from 'jsonwebtoken'

// User authentication middleware
const authUser = async (req,res,next) => {
    try{
        
        console.log(req.headers)
        const token = req.headers.token
        if(!token){
            return res.json({success:false,message:'Not authorized. Login Again'})

        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = token_decoded.id 
        

        next()

    }catch(error){
        console.log(error)
        return res.json({succes:false,message:error.message})
    }
}

export default authUser
