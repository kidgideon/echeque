import Header from "../components_home/Header";
import Footer from "../components_home/Footer";
import CTASection from "../components_home/CTASection";
import HeroSection from "../components_home/HeroSection";
import HowItWorks from "../components_home/HowItWorks";
import Features from "../components_home/Features";

const Home = () => {
    return(
        <div className="home-page-interface">
            <Header/>
            <HeroSection/>
            <HowItWorks/>
            <Features/>
             <CTASection/>
            <Footer/>
        </div>
    )
}

export default Home;