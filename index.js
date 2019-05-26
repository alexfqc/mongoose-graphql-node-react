import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import schema from "./graphql";
import User from "./models/User";

const app = express();
const PORT = process.env.PORT || "4000";
const db = "mongodb://localhost:27017/alexfqc";

// Connect to MongoDB with Mongoose.
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const mongo = { User };

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: true,
    context: { mongo }
  })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
