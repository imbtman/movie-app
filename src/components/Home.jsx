import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Popular from "../components/Popular";
import Trending from "../components/Trending";
import TopRated from "./Top Rated";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Popular />
      <Trending />
      <TopRated />
      <Footer />
    </>
  );
}
