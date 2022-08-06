import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";

export default function PrivatePage({ children }) {
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("trakit"));

  function volta(){
    navigate('/')
  }

  if (!auth || !auth.token) {
    alert('Para acessar essa pagina e necessario uma conta');
    volta()
  }

  if (auth) {
    return (
      <>
        <Header />
        {children}
        <Menu />
      </>
    );
  } else {
    volta();
  }
}
