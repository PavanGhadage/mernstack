import "./style/Packages.css";

function Packages() {
  return (
    <section id="packages" className="packages">
      <h2>Our Tour Packages</h2>

      <div className="package-container">
        <div className="package-card">
          <img src="/assets/himachal.jpg" alt="Himachal" />
          <h3>Himachal Tour</h3>
          <p>Price: ₹8000</p>
          <p>Duration: 5 Days</p>
          <p>Enjoy snow mountains and adventure.</p>
        </div>

        <div className="package-card">
          <img src="/assets/kerala.jpg" alt="Kerala" />
          <h3>Kerala Tour</h3>
          <p>Price: ₹7000</p>
          <p>Duration: 4 Days</p>
          <p>Backwaters and greenery.</p>
        </div>

        <div className="package-card">
          <img src="/assets/Rajsthan.jpg" alt="Rajasthan" />
          <h3>Rajasthan Tour</h3>
          <p>Price: ₹6000</p>
          <p>Duration: 4 Days</p>
          <p>Desert and royal palaces.</p>
        </div>
      </div>
    </section>
  );
}

export default Packages;
