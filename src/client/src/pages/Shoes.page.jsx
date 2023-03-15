import { useState, useEffect } from "react";
import { filterShoesByBrand, getListOf } from "../helpers/helpers";
import { Link } from "react-router-dom";

export default function ShoesPage() {
  const [shoesList, setShoesList] = useState([]);
  const [searchBrand, setSearchBrand] = useState("");

  useEffect(() => {
    fetchShoes();
  }, []);

  async function fetchShoes() {
    try {
      const res = await fetch(`http://localhost:8080/api/shoes`);

      if (res.ok) {
        const data = await res.json();
        console.log("Data received:", data);

        // Check if data is an object, and wrap it in an array
        const dataArray = Array.isArray(data) ? data : [data];
        console.log("Data array:", dataArray);

        setShoesList(
          dataArray.map((shoe) => ({
            ...shoe,
            image: shoe.image || "default-image.jpg",
          }))
        );
      } else {
        throw new Error("Response is not in JSON format");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log("shoesList updated:", shoesList); // Log the updated shoesList
  }, [shoesList]);

  async function deleteShoe(id) {
    // ...
  }

  const brands = getListOf(shoesList, "brand");
  const filteredShoes = filterShoesByBrand(shoesList, searchBrand);

  console.log("filteredShoes:", filteredShoes); // Log the filtered shoes

  return (
    <div>
      <h1>All Shoes in My Collection</h1>
      <form>
        <label htmlFor="searchBrand">Filter By Brand</label>
        <select
          name="searchBrand"
          id="searchBrand"
          value={searchBrand}
          onChange={(e) => setSearchBrand(e.target.value)}
        >
          <option value="">All</option>
          {brands.map((brand, idx) => (
            <option key={idx} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </form>
      <ul className="List">
        {filteredShoes.map((shoe, index) => (
          <li key={index}>
            <Link to={`${shoe.color}`}>{`${shoe.brand}   ${shoe.color}`}</Link>
            <img src={`/${shoe.image}`} alt={`${shoe.brand} ${shoe.color}`} />
            <button onClick={() => deleteShoe(shoe.shoeId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
