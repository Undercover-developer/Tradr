const AuthService = require("../services/authService");

module.exports = async (req, res, next) => {
     try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({success: false, message: 'Unauthorized'})
        }
        if (token.split(' ')[0] !== 'Bearer') {
            return res.status(401).json({success: false, message: 'Unauthorized'})
        }
   
        const decoded = await AuthService.verify(token.split(' ')[1])
        req.userId = decoded.userId
        next()
    } catch (err) {
        return res.status(401).json({success: false, message: 'Unauthorized'})
    }
}