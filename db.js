// mongodb driver
const MongoClient = require("mongodb").MongoClient;

//const dbConnectionUrl = "mongodb+srv://amruta:amruta@6@cluster0-uzlfu.mongodb.net/test?retryWrites=true&w=majority";
const dbConnectionUrl = "mongodb+srv://Amruta_Pawar:12345@cluster0-vgkdi.mongodb.net/test?retryWrites=true&w=majority";
function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be caught by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};
