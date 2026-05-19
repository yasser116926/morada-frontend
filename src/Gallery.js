import { useEffect, useState } from "react";

function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const getImageUrl = (img) => {
    if (!img) return "";

    // Full URL already
    if (img.startsWith("http")) {
      return img;
    }

    // Cloudinary partial path
    if (img.startsWith("image/upload")) {
      return `https://res.cloudinary.com/duwzhscip/${img}`;
    }

    // Django media fallback
    return `https://morada-backend-0e0j.onrender.com${img}`;
  };

  useEffect(() => {
    fetch("https://morada-backend-0e0j.onrender.com/api/artworks/")
      .then((res) => res.json())
      .then((data) => setArtworks(data));
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <h1>Gallery & Store</h1>

      {/* ADMIN BUTTON */}
      {isAdmin && (
        <div style={{ marginBottom: "30px" }}>
          <a
            href="/upload"
            style={{
              padding: "10px 20px",
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            + Upload Artwork
          </a>
        </div>
      )}

      {/* GALLERY GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {artworks.map((art) => {
          if (!art.image) return null;

          return (
            <div key={art.id} style={{ overflow: "hidden" }}>
              <img
                src={getImageUrl(art.image)}
                alt={art.title}
                onClick={() => setSelectedArt(art)}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  cursor: "pointer",
                  transition: "transform 0.4s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />

              <h3>{art.title}</h3>

              {isAdmin && (
                <button
                  onClick={async () => {
                    const confirmDelete = window.confirm(
                      "Delete this artwork?",
                    );
                    if (!confirmDelete) return;

                    const token = localStorage.getItem("token");

                    await fetch(
                      `https://morada-backend-0e0j.onrender.com/api/delete/${art.id}/`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );

                    setArtworks((prev) => prev.filter((a) => a.id !== art.id));

                    if (selectedArt && selectedArt.id === art.id) {
                      setSelectedArt(null);
                    }
                  }}
                  style={{
                    background: "crimson",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    cursor: "pointer",
                    marginBottom: "10px",
                    borderRadius: "4px",
                  }}
                >
                  Delete
                </button>
              )}

              {art.price && (
                <p>
                  {art.price} {art.currency}
                </p>
              )}

              {art.size && (
                <p>
                  <b>Size:</b> {art.size}
                </p>
              )}

              {art.material && (
                <p>
                  <b>Material:</b> {art.material}
                </p>
              )}

              {art.location && (
                <p>
                  <b>Location:</b> {art.location}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selectedArt && (
        <div
          onClick={() => setSelectedArt(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "auto",
              textAlign: "center",
            }}
          >
            <img
              src={getImageUrl(selectedArt.image)}
              alt={selectedArt.title}
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
                marginBottom: "20px",
              }}
            />

            <h2>{selectedArt.title}</h2>

            {selectedArt.price && (
              <p>
                {selectedArt.price} {selectedArt.currency}
              </p>
            )}
            {selectedArt.size && (
              <p>
                <b>Size:</b> {selectedArt.size}
              </p>
            )}
            {selectedArt.material && (
              <p>
                <b>Material:</b> {selectedArt.material}
              </p>
            )}
            {selectedArt.location && (
              <p>
                <b>Location:</b> {selectedArt.location}
              </p>
            )}

            <button onClick={() => setSelectedArt(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
