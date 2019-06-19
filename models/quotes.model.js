
const quotesModel = {
    getQuotes(conn){
        try {
            return new Promise((resolve, reject) => {
                let quotes = conn.collection('quotes').find().toArray();
                resolve(quotes);
            });
        } catch (error) {
            reject(error);
        }
    }
}

module.exports = quotesModel;