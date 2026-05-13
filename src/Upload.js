import { useState } from "react";

function Upload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    size: "",
    material: "",
    currency: "USD",
    location: "",
  });
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://morada-backend-0e0j.onrender.com/api/upload/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.text();
      console.log(data);

      if (!res.ok) throw new Error(data);

      alert("Artwork uploaded ✅");

      setForm({
        title: "",
        description: "",
        price: "",
        size: "",
        material: "",
        currency: "USD",
        location: "",
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Upload Artwork</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          style={inputStyle}
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          style={inputStyle}
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          style={inputStyle}
        />

        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="USD">USD</option>
          <option value="KSH">KSH</option>
        </select>

        <input
          name="size"
          value={form.size}
          onChange={handleChange}
          placeholder="Size"
          style={inputStyle}
        />
        <input
          name="material"
          value={form.material}
          onChange={handleChange}
          placeholder="Material"
          style={inputStyle}
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          style={inputStyle}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "15px" }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "black",
            color: "white",
            borderRadius: "8px",
          }}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Artwork"}
        </button>
      </form>
    </div>
  );
}

export default Upload;
