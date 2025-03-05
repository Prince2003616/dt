import CategorySection from "./components/Category/category";
import Companies from "./components/Companies/companies";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";
import Learning from "./components/Learning/Learning";
import Skill from "./components/Skill/skill";
import Stu from "./components/stu/stu";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <Companies />
      <CategorySection />
      <Stu />
      <Learning />
      <Skill />
      <Footer />
    </div>
  );
}
