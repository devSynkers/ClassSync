import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Loads JWT_SECRET from .env file

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 🛑 No token sent
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or format invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 🔐 Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 🧠 Attach decoded data to request
        req.user = decoded;

        next(); // ✅ Proceed to next route/controller
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
