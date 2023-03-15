import express from "express";
import { findAll, addOne, findOne, remove, updateOne } from "../controllers/shoes.controller";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await findAll();
    console.log('Data from findAll():', data); // Add this line
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newShoe = req.body;
    const data = await addOne(newShoe);
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await findOne(parseInt(id))[0];
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const udpatedShoe = req.body;
    const data = await updateOne(udpatedShoe, id);
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const shoe = await remove(id);
    if (!shoe) {
      return res.status(404).send("Shoe not found");
    }
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify({ message: "Shoe deleted successfully" }));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
