import mongoose from "mongoose";

const mongoConnct = async () => {
  try {
    const dbUrl = "mongodb://localhost/aug_b_ntdl";
    const conn = await mongoose.connect(dbUrl);

    conn ? console.log("Mongo Connected") : console.log(error);
  } catch (error) {
    console.log(error);
  }
};

export default mongoConnct;
