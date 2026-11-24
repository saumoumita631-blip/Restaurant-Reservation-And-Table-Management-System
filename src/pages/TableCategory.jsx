
import { useNavigate } from "react-router-dom";

function TableCategory() {
  const navigate = useNavigate();
  const categories = ["Regular", "Family", "Premium", "Executive"];

  function selectCategory(category) {
    localStorage.setItem("category", category);
    navigate("/tables");
  }

  return (
    <div>
      <h1>Select Table Category</h1>
      {categories.map((category) => (
        <div className="card" key={category}>
          <h3>{category}</h3>
          <button onClick={() => selectCategory(category)}>
            Choose {category}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TableCategory;
