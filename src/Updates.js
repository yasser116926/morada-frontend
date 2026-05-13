import { useEffect, useState } from "react";

function Updates() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const isAdmin = localStorage.getItem("is_admin") === "true";

  useEffect(() => {
    fetch("https://morada-backend-0e0j.onrender.com/api/events/")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("image", image);

    const token = localStorage.getItem("token");

    await fetch("https://morada-backend-0e0j.onrender.com/api/events/create/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    alert("Event added");

    window.location.reload();
  };

  return (
    <div style={{ padding: "60px", maxWidth: "800px", margin: "auto" }}>
      <h1>Updates & Exhibitions</h1>

      {isAdmin && (
        <div style={{ margin: "30px 0" }}>
          <details>
            <summary
              style={{
                cursor: "pointer",
                padding: "10px 15px",
                background: "#dbeafe",
                borderRadius: "8px",
                display: "inline-block",
              }}
            >
              + Add New Update
            </summary>

            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <br />

              <textarea
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <br />

              <input
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
              <br />
              <br />

              <input type="date" onChange={(e) => setDate(e.target.value)} />
              <br />
              <br />

              <input type="time" onChange={(e) => setTime(e.target.value)} />
              <br />
              <br />

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <br />
              <br />

              <button type="submit">Publish Update</button>
            </form>
          </details>
        </div>
      )}

      {events.map((event) => (
        <div key={event.id} style={{ marginBottom: "60px" }}>
          {event.image && (
            <img
              src={`http://127.0.0.1:8000${event.image}`}
              alt={event.title}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            />
          )}

          {isAdmin && (
            <button
              onClick={async () => {
                const confirmDelete = window.confirm("Delete this update?");
                if (!confirmDelete) return;

                await fetch(
                  `http://127.0.0.1:8000/api/events/delete/${event.id}/`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  },
                );

                setEvents((prev) => prev.filter((e) => e.id !== event.id));
              }}
              style={{
                background: "crimson",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                marginTop: "10px",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          )}

          <h2>{event.title}</h2>
          <p>
            <b>
              {event.date} | {event.time}
            </b>
          </p>
          <p>{event.location}</p>

          <p style={{ lineHeight: "1.6" }}>{event.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Updates;
