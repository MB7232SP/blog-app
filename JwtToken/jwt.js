const jwt = require('jsonwebtoken')
const signin = (payload)=>{
    const key = 'fhbukdbfujdwq459fdf99663gcvh9w'
     const token = jwt.sign(payload,key,{
        expiresIn:'7d'
     })
     return token;
}
const veryfy = (token)=>{
    try {
        const key = 'fhbukdbfujdwq459fdf99663gcvh9w'
        const data = jwt.verify(token,key,(err, decoded)=>{
            if(err){
                return {
                    err:"jwt expired"
                }
            }else{
               return decoded
            }
        })
     return data
    } catch (error) {
        throw new Error('somthing error in tocken or tocken is expired')
    }
}
module.exports = {
    signin,
    veryfy
}