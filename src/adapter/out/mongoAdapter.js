import mongoose from "mongoose";

const connectMongo = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Mongo conectado con Atlas");
  } catch (err) {
    console.error("Error conectando Mongo:", err.message);
  }
};

export default connectMongo;
