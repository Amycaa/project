import { useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
    const style1 = {
        marginTop:"10px",
        marginBottom:"10px"
    }
    const [felhasznaloNev, setFelhasznaloNev] = useState("");
    const [jelszo, setJelszo] = useState("");
    const [hiba, setHiba] = useState("");


    const location = useLocation();
    const navigate = useNavigate();

    const sikerUzenet = location.state?.uzenet;

  useEffect(() => {
    if (sikerUzenet) {
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const belepes = async () => {
    if (!felhasznaloNev || !jelszo) {
      setHiba("Minden mező kitöltése kötelező!");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ felhasznaloNev, jelszo })
      });

      const adat = await response.json();

      if (!response.ok) {
        setHiba(adat.hiba);
        return;
      }

      localStorage.setItem("token", adat.token);
      localStorage.setItem("userId", adat.userId);

      navigate("/messages");

    } catch (error) {
      setHiba("Szerver hiba");
    }
  };

  return (
    <div className="login">
      <h2>Bejelentkezés</h2>

      {sikerUzenet && <p className="siker">{sikerUzenet}</p>}
      {hiba && <p className="hiba">{hiba}</p>}
      
        <input
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

        <button onClick={belepes} style={style1}>Belépés</button>
        <button onClick={() => navigate("/register")}>Regisztráció</button>
    </div>
  );
}

export default Login;
