import { resolve } from "path";
import { ProductDb } from "./models/product";

import mongoose from "mongoose";

const uri: string = "mongodb://root:nodegmp@localhost:27017";

const options: mongoose.ConnectOptions = {
  dbName: "my_db",
  user: "root",
  pass: "pass",
};

export const initDb = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(uri, options)
      .then(async () => {
        console.log("Succesfully connected to MongoDB");

        const product = await ProductDb.findOne({
          _id: "891389f0-4312-42d6-a650-6fda0959c734",
        });

        if (product === null) {
          await new ProductDb({
            _id: "891389f0-4312-42d6-a650-6fda0959c734",
            title: "Book",
            description: "Interesting book",
            price: 200,
          }).save();
        }
        resolve(true)
      })
      .catch((error: Error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        reject(error)
      });
  });
};
