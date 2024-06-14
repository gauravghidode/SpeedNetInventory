import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next)=>{
    console.log("hello world");
    console.log(req);
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.user = user;
        next();
    })
    
}