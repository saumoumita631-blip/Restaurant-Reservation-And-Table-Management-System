
import { useState } from "react";
import "../styles/Menu.css";

const foodItems = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Starters",
    price: 149,
    type: "Non-Veg",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 249,
    type: "Veg",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 220,
    type: "Veg",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600",
  },
  {
    id: 4,
    name: "Chicken Chow Mein",
    category: "Main Course",
    price: 180,
    type: "Non-Veg",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600",
  },
  {
    id: 5,
    name: "French Fries",
    category: "Starters",
    price: 99,
    type: "Veg",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
  },
  {
    id: 6,
    name: "Pasta",
    category: "Main Course",
    price: 189,
    type: "Veg",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
  },
  {
    id: 7,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 120,
    type: "Veg",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
  },
  {
    id: 8,
    name: "Fresh Mojito",
    category: "Drinks",
    price: 110,
    type: "Veg",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600",
  },
];

const categories = [
  "All",
  "Starters",
  "Main Course",
  "Pizza",
  "Desserts",
  "Drinks",
];

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return previousCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...previousCart, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.05;
  const grandTotal = subtotal + gst;

  const billDate = new Date().toLocaleDateString("en-IN");
  const billTime = new Date().toLocaleTimeString("en-IN");

  const generateBill = () => {
    if (cart.length === 0) {
      alert("Please add food items before generating a bill.");
      return;
    }

    window.print();
  };

  return (
    <div className="menu-page">

      {/* MENU HEADER */}

      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Delicious food, freshly prepared for you!</p>
      </div>

      {/* SEARCH AND CATEGORY */}

      <div className="menu-toolbar">
        <input
          type="text"
          placeholder="Search your favourite food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="menu-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category ? "active" : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FOOD ITEMS */}

      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const cartItem = cart.find(
              (food) => food.id === item.id
            );

            return (
              <div className="food-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="food-image"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                <div className="food-details">
                  <span
                    className={
                      item.type === "Veg"
                        ? "food-type veg"
                        : "food-type nonveg"
                    }
                  >
                    {item.type}
                  </span>

                  <h3>{item.name}</h3>
                  <p>{item.category}</p>

                  <div className="food-card-bottom">
                    <strong>₹{item.price}</strong>

                    {cartItem ? (
                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                        >
                          -
                        </button>

                        <span>{cartItem.quantity}</span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-cart-btn"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-food">No food items found.</p>
        )}
      </div>

      {/* CUSTOMER BILL */}

      <div className="cart-summary">

        <div className="bill-heading">
          <h2>Restaurant Bill</h2>
          <p>Customer Invoice</p>
        </div>

        {cart.length > 0 ? (
          <>
            <div className="restaurant-details">
              <h3>YOUR RESTAURANT NAME</h3>
              <p>Restaurant Address</p>
              <p>Contact: 9876543210</p>

              <hr />

              <div className="bill-info">
                <p><strong>Bill Date:</strong> {billDate}</p>
                <p><strong>Bill Time:</strong> {billTime}</p>
                <p><strong>Total Items:</strong> {totalItems}</p>
              </div>
            </div>

            <table className="bill-table">
              <thead>
                <tr>
                  <th>Sl.</th>
                  <th>Food Item</th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="bill-total">
              <p>
                Subtotal:
                <span>₹{subtotal.toFixed(2)}</span>
              </p>

              <p>
                GST (5%):
                <span>₹{gst.toFixed(2)}</span>
              </p>

              <h3>
                Grand Total:
                <span>₹{grandTotal.toFixed(2)}</span>
              </h3>
            </div>

            <div className="bill-footer">
              <p>Thank you for visiting!</p>
              <strong>We hope to see you again.</strong>
            </div>

            <button
              className="add-cart-btn print-bill-btn"
              onClick={generateBill}
            >
              Generate & Print Bill
            </button>
          </>
        ) : (
          <p className="empty-cart">
            Your cart is empty. Please add food items.
          </p>
        )}
      </div>
    </div>
  );
}

export default Menu;
