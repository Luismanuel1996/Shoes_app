import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddShoe = () => {
  const [shoe, setShoe] = useState({
    Brand: "",
    Style: "",
    Size: "",
    Color: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoe((prevShoe) => ({
      ...prevShoe,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setShoe((prevShoe) => ({
      ...prevShoe,
      Image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Brand", shoe.Brand);
    formData.append("Style", shoe.Style);
    formData.append("Color", shoe.Color);
    formData.append("Size", shoe.Size);
    formData.append("description", shoe.description);
    formData.append("image", shoe.image);

    setIsPending(true);
    const response = await fetch("http://localhost:8080/api/shoes/", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("new shoe added", shoe);
    console.log("result from backend", result);
    setIsPending(false);
    navigate('/shoes')
  };

  return (
    <div className="create">
      <h1>Add Shoe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Brand</label>
          <select
            value={shoe.Brand}
            required
            name="Brand"
            onChange={handleChange}
          >
            <option value="">-- Select Brand --</option>
            <option value="Yeezy">Yeezy</option>
            <option value="Jordan">Jordan</option>
            <option value="Nike">Nike</option>
            <option value="Converse">Converse</option>
          </select>
        </div>
        <div>
          <label>Select Style</label>
          <select
            value={shoe.Style}
            required
            name="Style"
            onChange={handleChange}
          >
            <option value="">-- Select Style --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="Dunk Low">Dunk Low</option>
            <option value="Dunk High">Dunk High</option>
            <option value="350">350</option>
            <option value="500">500</option>
            <option value="700">700</option>
            <option value="Foam Runner">Foam Runner</option>
            <option value="CommeDeGarcon">Comme Des Garcons</option>
          </select>
        </div>
        <div>
          <label>ColorWay</label>
          <input
            value={shoe.Color}
            type="text"
            name="Color"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Select Size</label>
          <select
            value={shoe.Size}
            required
            name="Size"
            onChange={handleChange}
          >
            <option value="">-- Select Size --</option>
            <option value="8.5">8.5</option>
            <option value="9">9</option>
            <option value="9.5">9.5</option>
          </select>
        </div>
        <label>
          Image:
          <input type="file" name="Image" onChange={handleImageChange} />
        </label>
        <div>
          <label htmlFor="description">Write Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={shoe.description}
            onChange={handleChange}
          />
        </div>
        {isPending ? (
          <button type="submit">adding shoe...</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
};

export default AddShoe;
