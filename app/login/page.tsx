import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";
import Authentication from "./login";

export default function Home() {
  return (
    <div>
      <Header />
      <Authentication />
      <Footer />
    </div>
  );
}
