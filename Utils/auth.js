import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        throw error;
    }
    console.log('------->', authHeader);
    const token = authHeader.split(" ")[1];
    try {
        const verified = jwt.verify(token, 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
        if(!verified) {
            const err = new Error('Not Authenticated');
            err.statusCode = 401;
            throw(err);
        }
    }
    catch(error) {
        throw err;
    }
    next();
}

export default authenticate;