import { useState } from "react";

function Poste() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/events/create/", {
        method: "POST",
        headers: {
          "X-ADMIN-PASSWORD": "morada@123",
        },
        body: formData,
      });

      const text = await res.text();

      console.log("EVENT STATUS:", res.status);
      console.log("EVENT RESPONSE:", text);

      if (!res.ok) throw new Error(text || "Event failed");

      alert("Event posted 🎉");

      setForm({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
      });
      setImage(null);
    } catch (err) {
      console.error("EVENT ERROR:", err);
      alert("Event failed ❌ (check backend)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />
      <input
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
      />

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button disabled={loading}>
        {loading ? "Posting..." : "Post Event"}
      </button>
    </form>
  );
}

export default Poste;
