import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const PORT = 8000;
const app = express();

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://azizcodes:wumkKgDDvQLxGU0m@cluster0.ch5ydcm.mongodb.net/"
);

const TodosSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Todos = mongoose.model("todos", TodosSchema);
app.get("/", (req, res) => {
  res.send("Heom page");
});
app.get("/todos", (req, res) => {
  res.send({ message: "connected", data: [] });
});

app.listen(PORT, () => console.log("server is running"));
