const devotionsModel = require('../models/devotions.model');
const commonModel = require('../models/common.model');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;

const devotions = {
    getDevotions: async(req, res) => {

        // let translate = await commonModel.translate(req.db, text, 'en-ru');
        // res.json({data: translate});
        //let lang = req.body.lang;
        const { lang } = {...req.body};

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

        let devotions = await devotionsModel.getDevotions(req.db, collection);

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
        if(ins.insertedCount > 0){
            res.json({status: true, msg: 'Devotion inserted successfully!'})
        }else {
            res.json({status: false, msg: 'Something Went Wrong!'});
        }

    },
    getDevotionById: async(req, res) => {
        const { _id, lang} = {...req.body};
        let params = {
            _id: new ObjectId(_id)
        }
        let collection = devotions.getCollectionName(lang);

        let devotion = await devotionsModel.getDevotionById(req.db, params, collection);

        if(devotion.length > 0){
            res.json({status: true, data: devotion});
        }else {
            res.json({status: false, msg: 'No data found!'});
        }

    },
    getDevotionByDate: async(req, res) => {
        const {date, lang} = {...req.body};
        let params = {
            date,
            lang
        }
        let collection = devotions.getCollectionName(lang);

        let devotion = await devotionsModel.getDevotionById(req.db, params, collection);

        if(devotion.length > 0){
            res.json({status: true, data: devotion});
        }else {
            res.json({status: false, msg: 'No data found!'});
        }

    },
    updateDevotion: async(req, res) => {
        const { topic, bible_verse, devotion, prayer, confession, quote_date, lang, _id } = {...req.body};

        let params = {
            $set: {
            topic,
            bible_verse,
            devotion,
            prayer,
            confession,
            quote_date
            }
        }
        let where = {
            _id: new ObjectId(_id)
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

        let update = await devotionsModel.updateDevotion(req.db, where, params, collection);
        if(update == true){
            res.json({status: true, msg: 'Devotion updated successfully!'})
        }else {
            res.json({status: false, msg: 'Something Went Wrong!'});
        }
    },
    getCollectionName: (lang = '') => {
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

        return collection;
    }

}

module.exports = devotions;