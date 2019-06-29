const devotionsModel = require('../models/devotions.model');
const commonModel = require('../models/common.model');

const devotions = {
    getDevotions: async(req, res) => {

        // let translate = await commonModel.translate(req.db, text, 'en-ru');
        // res.json({data: translate});
        //let lang = req.body.lang;

        let devotions = await devotionsModel.getDevotions(req.db);

        if(devotions.length > 0){
            res.json({status: true, data: devotions});
        }else {
            res.json({status: false, msg: 'No data found!'});
        }
    },
    insertDevotion: async(req, res) => {
        const { topic, bible_verse, devotion, prayer, confession, quote_date, lang } = {...req.body};

        let params = {
            topic,
            bible_verse,
            devotion,
            prayer,
            confession,
            quote_date
        }
        let collection = 'devotions';
        if(lang == 'Spanish'){
            collection = 'devotionsSpanish';
        }else if(lang == 'French'){
            collection = 'devotionsFrench';
        }else if(lang == 'Hausa'){
            collection = 'devotionsHausa';
        }else if(lang == 'Yoruba'){
            collection = 'devotionsYoruba';
        }else if(lang == 'Igbo'){
            collection = 'devotionsIgbo';
        }else if(lang == 'Portuguese'){
            collection = 'devotionsPortuguese';
        }else if(lang == 'German'){
            collection = 'devotionsGerman';
        }

        let ins = await devotionsModel.insertDevotion(req.db, params, collection);
        if(ins.length > 0){
            res.json({status: true, msg: 'Devotion inserted successfully!'})
        }else {
            res.json({status: false, msg: 'Something Went Wrong!'});
        }

    }

}

module.exports = devotions;