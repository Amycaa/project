import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [felhasznaloNev, setFelhasznaloNev] = useState("");
  const [jelszo, setJelszo] = useState("");
  const [hiba, setHiba] = useState("");

  const navigate = useNavigate();

  const regisztracio = () => {
    if (!felhasznaloNev || !jelszo) {
      setHiba("Minden mező kitöltése kötelező!");
      return;
    }


    navigate("/", {
      state: { uzenet: "Sikeres regisztráció ✅" }
    });
  };

  return (
    <div className="register">
      <h2>Regisztráció</h2>

      {hiba && <p className="hiba">{hiba}</p>}

      <input
        type="text"
        placeholder="Felhasználónév"
        value={felhasznaloNev}
        onChange={(e) => setFelhasznaloNev(e.target.value)}
      />

      <input
        type="password"
        placeholder="Jelszó"
        value={jelszo}
        onChange={(e) => setJelszo(e.target.value)}
      />

      <button onClick={regisztracio} style={{marginTop:"10px"}}>Regisztráció</button>
    </div>
  );
}

export default Register;
