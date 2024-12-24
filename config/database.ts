import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.connect(process.env.DB!).then((link) => {
    console.log(`Database connected successfully | ${link.connection.host}`);
  });
};

export default connectDatabase;
