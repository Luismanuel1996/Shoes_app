import express from "express";
import config from "config";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import apiRouter from "./routes";
import multer from "multer";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.use(morgan("common"));

app.use("/api", upload.single("Image"), apiRouter);

app.use("/uploads", express.static(path.join(__dirname, "./public/uploads")));

app.use(express.static(path.join(__dirname, "./public")));

app.use((err, req, res, next) => {
  console.error(err);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify({ name: err.name, msg: err.message }));
});

const PORT = process.env.PORT || config.get("port") || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

export default app;
