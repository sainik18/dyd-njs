const authModel = require('../models/auth.model');
const commonModel = require('../models/common.model');

const auth = {
    adminRegister: async (req, res) => {
        const { email, password} = {...req.body};
        let params = {
            email: email,
            password: await commonModel.encrypt(password)
        }

        let existsParams = {
            email: email
        }

        let adminExists = await authModel.checkAdminExists(req.db, existsParams);
        if(adminExists.length > 0){
            res.json({status: false, msg: 'Email Already Registered!'})
        }else {
            let data = await authModel.adminRegister(req.db, params);
            res.json({status: true, data: data});
        }
        
    },
    adminLogin : (req, res) => {
        res.json({"data":"resp"});
    }
}

module.exports = auth;