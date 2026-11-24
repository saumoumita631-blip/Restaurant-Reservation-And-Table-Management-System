
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(4);

  const navigate = useNavigate();

  // Refresh CAPTCHA
  const refreshCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer("");
  };

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();

    // CAPTCHA verification
    if (Number(answer) !== num1 + num2) {
      alert("Incorrect CAPTCHA. Try again.");
      refreshCaptcha();
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      if (data.user.role !== "customer") {
        alert("Please use the Admin Login page.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authChanged"));

      alert("Login successful!");
      navigate("/home");

    } catch (error) {
      alert("Cannot connect to server.");
    }
  };

  return (
    <div className="card">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* CAPTCHA SECTION */}
        <div
          style={{
            display: "block",
            padding: "20px",
            margin: "20px 0",
            backgroundColor: "#e8f5e9",
            border: "2px solid #174b38",
            borderRadius: "8px",
          }}
        >
          <h3>CAPTCHA Verification</h3>

          <h2>
            What is {num1} + {num2}?
          </h2>

          <input
            type="number"
            placeholder="Enter CAPTCHA answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <button type="button" onClick={refreshCaptcha}>
            Refresh CAPTCHA
          </button>
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
