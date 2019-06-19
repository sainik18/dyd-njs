const quotesModel = require('../models/quotes.model');

const quotes = {
    getQuotes: async(req, res) => {
        let quotes = await quotesModel.getQuotes(req.db);
        if(quotes.length > 0){
            res.json({status: true, data: quotes});
        }else {
            res.json({status: false, msg: 'No data found!'});
        }
        
    }
}

module.exports = quotes;