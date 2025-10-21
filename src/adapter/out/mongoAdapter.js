const mongoose = require("mongoose");

const connectMongo = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Mongo conectado con Atlas");
  } catch (err) {
    console.error("Error conectando Mongo:", err.message);
  }
};

module.exports = connectMongo;
