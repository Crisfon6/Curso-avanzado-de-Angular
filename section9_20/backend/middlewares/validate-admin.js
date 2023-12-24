const User = require('../models/user');

const validateADMIN_ROLE = async (req,res,next)=>{
    try {
       const userDB =  await User.findById(req.uid);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: 'User not found.'
            });
        }
        if(userDB.role!=='ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg: 'Unathorized'
            });
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Send email to the admin'
        });
    }
}
const validateADMIN_ROLE_or_sameUser = async (req,res,next)=>{
    try {
       const userDB =  await User.findById(req.uid);
       const idModify = req.params.id;
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: 'User not found.'
            });
        }
        if(userDB.role ==='ADMIN_ROLE'  ||  idModify === req.uid){
            next();
        }
        else{
          
            return res.status(403).json({
                ok:false,
                msg: 'Unathorized'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Send email to the admin'
        });
    }
}
module.exports = {
    validateADMIN_ROLE,
    validateADMIN_ROLE_or_sameUser
}