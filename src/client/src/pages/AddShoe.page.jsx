import React, { useState } from "react";

const AddShoe = () => {
  const [shoe, setShoe] = useState({
    brand: "",
    style: "",
    size: "",
    color: "",
    description: "",
    image: null,
  });

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
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand", shoe.brand);
    formData.append("style", shoe.style);
    formData.append("size", shoe.size);
    formData.append("color", shoe.color);
    formData.append("description", shoe.description);
    formData.append("image", shoe.image);

    setIsPending(true);
    formData.append("Content-Type", "multipart/form-data");
    fetch("http://localhost:8080/api/shoes/", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        console.log("new shoe added");
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create">
      <h1>Add Shoe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Brand</label>
          <select
            value={shoe.brand}
            required
            name="brand"
            onChange={handleChange}
          >
            <option value="">-- Select Brand --</option>
            <option value="Yeezy">Yeezy</option>
            <option value="Jordan">Jordan</option>
            <option value="Nike">Nike</option>
            <option value="Nike">Converse</option>
          </select>
        </div>
        <div>
          <label>Select Style</label>
          <select
            value={shoe.style}
            required
            name="style"
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
            <option value="CommeDeGarcon">Comme Des Garcons</option>
          </select>
        </div>
        <div>
          <label>ColorWay</label>
          <input
            type="text"
            name="color"
            required
            value={shoe.color}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Select Size</label>
          <select
            value={shoe.size}
            required
            name="size"
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
        <input type="file" name="image" onChange={handleImageChange} />
      </label>
        <div>
          <label htmlFor="description">Write Description</label>
          <input
            type="text"
            id="description"
            name="description"
            required
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
