import jwt from 'jsonwebtoken'

// Doctor authentication middleware
const authDoctor = async (req,res,next) => {
    try{
        
        console.log(req.headers)
        const dtoken = req.headers.dtoken
        if(!dtoken){
            return res.json({success:false,message:'Not authorized. Login Again'})

        }
        const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET)

        req.docId = token_decoded.id 
        

        next()

    }catch(error){
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

export default authDoctor
