const mongoose = require("mongoose");

const uri = process.env.DB_STRING;
const options = {
  autoIndex: false, // Don't build indexes
  useNewUrlParser: true,
};

mongoose.connect(uri, options);

const ccDB = mongoose.connection;

ccDB.once("open", function callback() {
  console.log("MY DB Connected with Mongoose");
});

module.exports = {
  ccDB: ccDB,
};
