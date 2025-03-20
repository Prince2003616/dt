import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";
import IScienceSection from "./iscience";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="bg-white">
        <IScienceSection />
      </div>
      <Footer />
    </div>
  );
}
