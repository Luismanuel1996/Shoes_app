import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleShoePage(props) {
  const [item, setItem] = useState({});
  const [imageSrc, setImageSrc] = useState('');
  const { id } = useParams();

  function getShoe() {
    fetch(`http://localhost:8080/api/Shoes/${id}`)
      .then((res) => res.json())
      .then((item) => {
        setItem(item[0]);
        if (item[0].imageBlob instanceof Blob) {
          const reader = new FileReader();
          reader.readAsDataURL(item[0].imageBlob);
          console.log(item[0]);
          reader.onload = () => setImageSrc(reader.result);
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getShoe();
  }, [id]);

  useEffect(() => {
    if (item.imageBlob instanceof Blob) {
      setImageSrc(URL.createObjectURL(item.imageBlob));
    }
  }, [item]);

  return (
    <div>
      <h1>{item.Brand}</h1>
      <h2>{`${item.Style} ${item.Color}`}</h2>
      <p>{item.description}</p>
      <img src={imageSrc} alt="Shoe" />
    </div>
  );
}