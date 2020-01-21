const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/inputs", async (req, res) => {
  const data = fs.readFileSync("./inputs.json");

  res.status(200).json({ status: 200, inputs: JSON.parse(data).form_inputs });
});

app.post("/submit/form", (req, res) => {
  res.status(200).json({ status: 200 });
});

app.listen(5000, () => console.log("server started on port 5000"));
