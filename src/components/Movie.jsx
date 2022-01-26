import Navbar from "../components/Navbar";
import MovieHero from "./MovieHero";
import Footer from "../components/Footer"
import Cast from "./Cast";
import { useParams } from "react-router";

export default function Movie() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <MovieHero id={id} />
      <div className="bg-gray-100">
        <Cast id={id} />
      </div>
      <Footer />
    </>
  );
}
