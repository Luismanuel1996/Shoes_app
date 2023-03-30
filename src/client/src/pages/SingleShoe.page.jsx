import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import stockImage from "../images/stockImage.jpg";

const centeredImage = {
  display: "block",
  margin: "0 auto",
};

export default function SingleShoePage(props) {
  const [shoe, setShoe] = useState({});
  const [imageSrc, setImageSrc] = useState(stockImage);
  const { id } = useParams();

  useEffect(() => {
    const getShoe = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/shoes/${id}`);
        const data = await res.json();
        console.log(data[0])
        setShoe(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getShoe();
  }, [id]);

  useEffect(() => {
    if (shoe.image instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(shoe.image);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
    }
  }, [shoe]);

  return (
    <div>
      <h1>{shoe.Brand} {shoe.Style} {shoe.Color}</h1>
      <p>{shoe.description}</p>
      {shoe.image instanceof Blob ? (
        <img src={imageSrc} height="300" width="450" alt="Shoe" style={centeredImage} />
      ) : (
        <img src={shoe.image} height="300" width="450" alt="Shoe" style={centeredImage} />
      )}
      <Link to={`/shoes/${shoe.shoeId}/edit`}><button>Edit</button></Link>
    </div>
  );
}
