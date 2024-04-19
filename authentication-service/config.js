import mongoose from "mongoose";




export const connectDataBase = () => {
    mongoose
      .connect(
        `mongodb://127.0.0.1:27017/Microservice1`
      )
      .then((con) => console.log(`dataBase connected :${con.connection.host}`))
      .catch((err) => console.log(err));
  };