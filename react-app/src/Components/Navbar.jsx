import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
  const [nyitva, setNyitva] = useState(false);
  const navigate = useNavigate();

  const kilepes = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-fejlec">
        <button className="menu-gomb" onClick={() => setNyitva(!nyitva)}>
          ☰
        </button>
      </div>

      {nyitva && (
        <div className="dropdown-menu">
          <button onClick={() => {
            navigate("/users");
            setNyitva(false);
          }}>
            Fiók kezelés
          </button>

          <button onClick={kilepes}>
            Kilépés
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
