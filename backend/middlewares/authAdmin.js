import jwt from 'jsonwebtoken'

// admin authentication middleware
const authAdmin = async (req,res,next) => {
    try{
        
        console.log(req.headers)
        const {atoken} = req.headers
        if(!atoken){
            return res.json({succes:false,message:'Not authorized. Login Again'})

        }
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET)

        if (decoded.role !== 'admin') {
            return res.json({ success: false, message: 'Not authorized' })
        }

        next()

    }catch(error){
        console.log(error)
        return res.json({succes:false,message:error.message})
    }
}

export default authAdmin
