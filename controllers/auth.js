const authModel = require('../models/auth.model');

const auth = {
    adminRegister: async (req, res) => {
        const { email, password} = {...req.body};
        let params = {
            email: email,
            password: password
        }
        let data = await authModel.adminRegister(req.db, params);
        res.json({status: true, data: data});
    },
    adminLogin : (req, res) => {
        res.json({"data":"resp"});
    }
}

module.exports = auth;