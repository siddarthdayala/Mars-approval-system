import mongoose from "mongoose";

async function connect() {
  //const username = process.env.MONGO_DB_USERNAME;
  //const passport = process.env.MONGO_DB_PASSWORD;
  //const url = process.env.MONGO_DB_URL;

  await mongoose.connect(
    "mongodb+srv://siddarthdayala24:scbSwsqb7imN8wQO@employees.isqcd8p.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDB connection is successful");
}

export default connect;

//mongodb+srv://siddarthdayala24:<password>@employees.isqcd8p.mongodb.net/?retryWrites=true&w=majority