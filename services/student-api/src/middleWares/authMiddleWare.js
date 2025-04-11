import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();//why ??

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"No token provided"})
    }
    const token = authHeader.split(' ')[1]; //what is happening ?
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(decoded){
        req.user = decoded
        next();
    }else {
        return res.status(401).json({message:"Invalid token or token expired"})
    }
}

export default authMiddleware;