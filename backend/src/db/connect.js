//let config = require("./config");
let server = null;
const mongoClient = require("mongodb").MongoClient;

const connect =  () => {
	mongoClient.connect("mongodb://localhost:27017/RESTPI", { useUnifiedTopology: true }, function (err, db) {
		if (err) {
			console.log(err);
			console.log("error connecting to database");
		} else {
			console.log("connected to database");
			server = db;
			//callback();
		}
	})
}

function collection(value){
	return server.db().collection(value);
}

function close(){
	server.close();
}

module.exports = {
	connect,
	collection,
	close
};
