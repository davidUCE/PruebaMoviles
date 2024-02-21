import cors from "cors";
import express, { Request, Response } from "express";
import multer from "multer";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from "uuid";
import { OpenAI } from 'openai';
import { process_doc } from "./lang_script";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = 9004;
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
});

const generatePrompt = (numberToConvert: number) => {
  return ` Tu tienes un rol de convertidor binario y requiero que conviertes este numero ${numberToConvert} a  binario`;
};

let names = [
  {
    id: uuidv4(),
    firstName: "DAVID",
    lastName: "SORIA",
  },
  {
    id: uuidv4(),
    firstName: "Lea",
    lastName: "Rolfes",
  },
];

app.get("/ping", (req, res) => {
  console.log("alguien ha dado pin!!");
  res.setHeader("Content-Type", "application/json");
  res.send("pong");
});

app.post("/upload", upload.array("file"), async (req, res) => {
  if (!req.file || !req.body?.question) {
    return res.status(400).send();
  }
  
  const response = await process_doc(req.file?.filename, req.body.question);
  res.send(response);
});

app.get("/hola/:nombre/:apellido", (req, res) => {
  console.log("alguien ha dado pin!!");
  res.setHeader("Content-Type", "application/json");
  const nombre = req.params.nombre;
  const apellido = req.params.apellido;
  console.log("alguien ha ingresado su nombre");
  res.send({ nombre, apellido });
});

app.get("/nombres", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(names);
});

app.post("/nombres", (req, res) => {
  const item = { ...req.body, id: uuidv4() };
  names.push(item);
  res.send(item);
});

app.post("/openapi", async (req, res) => {
  console.log('numero')
  const openai = new OpenAI({
    apiKey: "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",
  });
  const number = req.body.prompt;
  const prompt = `Convierte ${number} a binario, no quiero otro texto que no sea el numero`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.1,
  });
 
  res.send({
    result: completion.choices[0].message.content,
    token: completion.usage?.total_tokens,
  });
});

app.delete("/nombres/:id", (req, res) => {
  names = names.filter((n) => n.id !== req.params.id);
  res.status(204).end();
});

app.get("/nombres/:id", (req, res) => {
  const searchedName = names.find((n) => n.id === req.params.id);
  if (!searchedName) res.status(400).end();
  res.send(searchedName);
});

app.put("/nombres/:id", (req, res) => {
  const index = names.findIndex((n) => n.id === req.params.id);
  if (index === -1) res.status(404).end();
  names[index] = { ...req.body, id: req.params.id };
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`running application ${PORT}`);
});


