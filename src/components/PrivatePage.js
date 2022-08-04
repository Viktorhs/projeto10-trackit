import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function PrivatePage({ children }) {
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("trakit")).token;

  if (!auth) {
    alert('Para acessar essa pagina e necessario uma conta');
    navigate("/");
  }

  if (auth) {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }
}
