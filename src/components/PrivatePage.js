import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";

export default function PrivatePage({ children }) {
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("trakit"));
  

  if (!auth || !auth.token) {
    alert('Para acessar essa pagina e necessario uma conta');
    navigate("/");
  }

  if (auth) {
    return (
      <>
        <Header />
        {children}
        <Menu />
      </>
    );
  }else{
    navigate("/");
  }
}
