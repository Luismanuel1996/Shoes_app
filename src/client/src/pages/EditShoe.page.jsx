import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditShoePage() {
  const { id } = useParams();
  const [brand, setBrand] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/shoes/${id}`);
        const data = await res.json();
        setBrand(data[0].Brand);
        setStyle(data[0].Style);
        setSize(data[0].Size);
        setColor(data[0].Color);
        setDescription(data[0].Description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchShoe();
  }, [id]);

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleStyleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Brand", brand);
    formData.append("Style", style);
    formData.append("Size", size);
    formData.append("Color", color);
    formData.append("Description", description);
    formData.append("Image", image);

    const response = await fetch(`http://localhost:8080/api/shoes/${id}`, {
      method: "PUT",
      body: formData,
    });

    console.log(response);
  };

  return (
    <div className="create">
      <h1>Edit Shoe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          name="brand"
          id="brand"
          value={brand}
          onChange={handleBrandChange}
        />
        <label htmlFor="style">Style:</label>
        <input
          type="text"
          name="style"
          id="style"
          value={style}
          onChange={handleStyleChange}
        />
        <label htmlFor="size">Size:</label>
        <input
          type="text"
          name="size"
          id="size"
          value={size}
          onChange={handleSizeChange}
        />
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          name="color"
          id="color"
          value={color}
          onChange={handleColorChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
        <button type="submit">Update Shoe</button>
      </form>
    </div>
  );
}
