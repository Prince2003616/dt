import CategorySection from "./components/Category/category";
import Companies from "./components/Companies/companies";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";
import Skill from "./components/Skill/skill";

export default function Home() {
  return (
    <div>
      <Header />
      <Companies />
      <CategorySection />
      <Skill />
      <Footer />
    </div>
  );
}
