
import { Link } from "react-router-dom";

function RestaurantDetails() {
  return (
    <div className="card">
      <h1>Our Restaurant</h1>
      <img
        src="/images/restaurant.jpg"
        alt="Restaurant"
        className="restaurant-img"
      />
      <p>Fresh food, friendly service and comfortable seating.</p>
      <p>Opening hours: 12 PM – 10 PM</p>
      <Link to="/menu"><button>View Menu</button></Link>
      <Link to="/booking"><button>Reserve Table</button></Link>
    </div>
  );
}

export default RestaurantDetails;
