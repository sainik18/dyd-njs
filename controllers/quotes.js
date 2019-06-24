const quotesModel = require('../models/quotes.model');
const commonModel = require('../models/common.model');

const quotes = {
    getQuotes: async(req, res) => {



        // let translate = await commonModel.translate(req.db, text, 'en-ru');
        // res.json({data: translate});
        //let lang = req.body.lang;

        let quotes = await quotesModel.getQuotes(req.db);

        if(quotes.length > 0){
            res.json({status: true, data: quotes});
        }else {
            res.json({status: false, msg: 'No data found!'});
        }
        
    }
}

module.exports = quotes;