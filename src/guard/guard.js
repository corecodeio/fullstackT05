const Guard = require('./../models/guard');

const guard = async(req, res, next)=>{
    //console.log('aqui')
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        return res.status(403).json({
            message:'unauthorized'
        })
    }
    const person_token = req.headers.authorization.split('Bearer ')[1];
    //console.log(person_token);
    try {
        const args = {
            person_token
        }
        const { rows } = await Guard.personToken(args);
        if(rows.length>0){
            req.person = rows[0];
            return next();
        }
    } catch (error) {
        console.log(error);
    }
    return res.status(403).json({
        message:'unauthorized'
    })
}

module.exports= guard;