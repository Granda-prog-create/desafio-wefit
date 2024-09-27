import express from "express";
import dotenv from "dotenv";
import endpointRouter from "./endpoint"

dotenv.config(); 

const app = express();
app.use(express.json()); 

const port = process.env.PORT || 4568;


app.use("/api", endpointRouter);

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
