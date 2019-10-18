const authModel = require('../models/auth.model');
const commonModel = require('../models/common.model');

const auth = {
    adminRegister: async (req, res) => {
        const { email, password } = {...req.body};
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
            res.json({status: true, msg: 'Registered Successfully!'});
        }
        
    },
    adminLogin: async(req, res) => {
        const { email, password } = {...req.body};
        let params = {
            email: email,
            //password: await commonModel.encrypt(password)
        }
        let adminExists = await authModel.checkAdminExists(req.db, params);
        console.log(adminExists.length);

        if(adminExists.length > 0){
            // verify password
            let verifyPwd = await commonModel.compareHash(password, adminExists[0].password);
            if(verifyPwd){
                res.json({status: true, data: adminExists});
            }else {
                res.json({status: false, msg: 'Incorrect Password!'});    
            }
            
        }else {
            res.json({status: false, msg: 'Email Does not Exists!'});
        }
        

    },
    generateEncPassword: async(req, res) => {
        const { email, password } = {...req.body};
            let pwd = await commonModel.encrypt(password);
            res.json({status: true, password: pwd });
    }
}

module.exports = auth;