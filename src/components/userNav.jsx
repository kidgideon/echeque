import Styles from "../styles/home.module.css";
import logo from "../images/logo.png"
import { Link , useNavigate} from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav  className={Styles.navbar}>
         <img onClick={() => {navigate("/")}} src={logo} alt="SwiftChq Logo" className={Styles.logo} />
       <p onClick={() => {navigate("/")}}>
        swift cheque
       </p>
    </nav>
  );
};

export default Navbar;
