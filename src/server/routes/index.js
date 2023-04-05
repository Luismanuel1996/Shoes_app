import express from "express";
import shoeRouter from "./shoes.routes.js";

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/shoes", shoeRouter);

export default router;
