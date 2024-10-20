import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const protectPrivateRoutesMiddleware = async (req, res, next) => {

    const {_token} = req.cookies;

    if(!_token){
        return res.redirect('/auth/login');
    }

    try{
        const decoded = jwt.verify(_token, process.env.JWT_SECRET); // Decode token
        const user = await User.scope('excludeSensitiveUserInformation').findByPk(decoded.id); // Find user by id

        if(!user){
            return res.clearCookie('_token').redirect('/auth/login');
        }

        req.user = user;

    }catch(error){
        return res.clearCookie('_token').redirect('/auth/login');
    }

    next();
}

export default protectPrivateRoutesMiddleware;