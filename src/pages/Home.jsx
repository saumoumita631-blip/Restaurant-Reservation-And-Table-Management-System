
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <h1>Welcome to TableEase</h1>
      <p>Enjoy delicious food and book your favourite table.</p>
      <Link to="/restaurant"><button>Explore Restaurant</button></Link>
      <Link to="/booking"><button>Book a Table</button></Link>
    </div>
  );
}

export default Home;
