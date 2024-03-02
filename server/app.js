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
app.get("/todos", async (_, res) => {
  try {
    const data = await Todos.find();
    return res.send(data);
  } catch (err) {
    res.send({ message: "Server error" });
  }
});

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    const data = new Todos({
      title,
      description,
    });
    await data.save();
    res.send({ message: "Data saved", payload: data });
  } catch (err) {
    res.send({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log("server is running"));
