import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.page";
import ShoesPage from "./pages/Shoes.page";
import SingleShoePage from "./pages/SingleShoe.page";
import AddShoe from "./pages/AddShoe.page";

export default function App(props) {
  return (
    <BrowserRouter>
      <nav>
        <ul className="Links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shoes">Shoes</NavLink>
          </li>
          <li>
            <NavLink to="/shoes/add-shoe">Add Shoe</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shoes" element={<ShoesPage />} />
        <Route path="/shoes/:id" element={<SingleShoePage />} />
        <Route path="/shoes/add-shoe" element={<AddShoe />} />
      </Routes>
    </BrowserRouter>
  );
}
