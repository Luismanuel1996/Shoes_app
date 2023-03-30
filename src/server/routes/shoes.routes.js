import express from "express";
import { findAll, addOne, findOne, remove, updateOne, updateShoeImage } from "../controllers/shoes.controller";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get("/", async (req, res, next) => {
  try {
    const data = await findAll();
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data));
    res.statusCode = 400;
  } catch (err) {
    next(err);
  }
});

router.post("/", upload.single("Image"), async (req, res, next) => {
  try {
    const newShoe = {
      Brand: req.body.Brand,
      Style: req.body.Style,
      Size: req.body.Size,
      Color: req.body.Color,
      Description: req.body.Description,
      Image: req.file ? `/uploads/${req.file.filename}` : null,
    };
    const data = await addOne(newShoe);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await findOne(parseInt(id));
    res.header("Content-Type", "application/json");
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
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data));
  } catch (err) {
    next(err);
  }
});

router.put("/:id/image", upload.single("Image"), async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) {
      throw new Error("No image provided");
    }

    await updateShoeImage(image, id);
    res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const shoe = await remove(id);
    if (!shoe) {
      return res.status(404).send("Shoe not found");
    }
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify({ message: "Shoe deleted successfully" }));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
