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

        const dataArray = Array.isArray(data) ? data : [data];

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

  const brands = getListOf(shoesList, "Brand");
  const filteredShoes = filterShoesByBrand(shoesList, searchBrand);

  async function deleteShoe(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shoe?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/shoes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove the shoe from the list of shoes
        const newShoesList = shoesList.filter((shoe) => shoe.shoeId !== id);
        setShoesList(newShoesList);
      } else {
        throw new Error("Failed to delete the shoe");
      }
    } catch (err) {
      console.error(err);
    }
  }

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
            <Link to={`/shoes/${shoe.shoeId}`}>
              {`${shoe.Brand}   ${shoe.Color}`}
            </Link>
            <button onDoubleClick={() => deleteShoe(shoe.shoeId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}