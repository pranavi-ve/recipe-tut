
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.s7vgp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const database = {
    createDbConnect : function(cb){
        client.connect(err => {
            if(err){
                console.log(err);
                cb(err);
            }
        db = client.db(process.env.DB_NAME);
        console.log("connected to database");
        cb();
        // perform actions on the collection object
        // client.close();
      });
    },
    getDb(){
        return db;
    }
}

module.exports = database;


