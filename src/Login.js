import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // REGISTER
    if (isRegister) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            receive_updates: receiveUpdates,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Registration failed");
          return;
        }

        alert("Account created successfully 🎉");

        setIsRegister(false);
      } catch (err) {
        console.error(err);
        alert("Network error");
      }

      return;
    }

    // LOGIN
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // SAVE USER
      localStorage.setItem("token", data.token);
      localStorage.setItem("is_admin", data.is_admin);
      localStorage.setItem("username", data.username);

      alert(`Welcome back ${username} ✨`);

      // GO HOME
      navigate("/");

      // refresh navbar
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #dbeafe 0%, #f8fafc 50%, #bfdbfe 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px",
          borderRadius: "30px",
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.25)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 8px 32px rgba(31,38,135,0.15)",
          transition: "0.3s",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          {isRegister ? "Create Account" : "Welcome Back"}
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />

          {isRegister && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          )}
          {isRegister && (
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "14px",
                color: "#333",
                marginTop: "-5px",
                marginBottom: "5px",
              }}
            >
              <input
                type="checkbox"
                checked={receiveUpdates}
                onChange={(e) => setReceiveUpdates(e.target.checked)}
                style={{
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
              />
              Receive updates about exhibitions and new artworks
            </label>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyle}
            />
          )}

          <button
            type="submit"
            style={{
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              background: "#60a5fa",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#444",
          }}
        >
          {isRegister
            ? "Already have an account?"
            : "You don't have an account?"}

          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{
              color: "#2563eb",
              marginLeft: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isRegister ? "Login" : "Register now"}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(255,255,255,0.4)",
  outline: "none",
  fontSize: "15px",
};

export default Login;
