import jwt from 'jsonwebtoken';

function generateId(){
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
}

function jwtgen(data){
    return jwt.sign({
        id: data.id,
        name: data.name
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    });
}

export{
    generateId,
    jwtgen
}