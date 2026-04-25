import "../styles/Home.css";
import banner from "../../public/assets/goa.jpg";

function Home() {
  return (
    <section id="home" className="home">
      <img src={banner} alt="India Tourism" className="banner" />
      <div className="home-content">
        <h2>Welcome to Incredible India</h2>
        <p>
          Experience the rich culture, heritage, and beauty of India. From the
          snowy mountains of Himachal to the sunny beaches of Goa, we bring you
          unforgettable journeys.
        </p>
        <p>
          Travel with us and explore India's most iconic destinations with
          comfort, safety, and excitement.
        </p>
      </div>
    </section>
  );
}

export default Home;
