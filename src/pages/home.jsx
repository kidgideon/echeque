import logo from "../images/logo.png";
import Styles from "../styles/home.module.css";
import Action from "../components/action";
import Navbar from "../components/userNav";
import Patners from "../components/patners";
import Works from "../components/works";
import Awards from "../components/awards";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div className={Styles.homePageInterface}>
      <Navbar logo={logo} />
      <Action/>
      <Patners/>
      <Works/>

      <h2> 24/7 customer support</h2>
      <Awards/>
      <Footer/>
    </div>
  );
};

export default Home;
