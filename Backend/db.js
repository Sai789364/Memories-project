const mongoose=require('mongoose')

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://devireddysairishikar2003:7uNV7g7h225tPrrq@cluster0.5qm4s0k.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to mongo successfully");
  } catch (error) {
    console.error("Error connecting to mongo:", error);
  }
};

module.exports=connectToMongo;
