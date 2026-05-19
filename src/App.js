import { Routes, Route, Link } from "react-router-dom";
import Gallery from "./Gallery";
import Upload from "./Upload";
import Updates from "./Updates";
import Login from "./Login";
import Register from "./Register";

function App() {
  const isLoggedIn = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // 🎨 NAV STYLE
  const navStyle = {
    marginRight: "20px",
    textDecoration: "none",
    color: "#111",
    padding: "10px 16px",
    borderRadius: "12px",
    transition: "0.3s",
    fontWeight: "500",
  };

  // 👤 ACCOUNT STYLE
  const accountStyle = {
    textDecoration: "none",
    color: "#111",
    padding: "10px 18px",
    borderRadius: "14px",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    fontWeight: "600",
  };

  const updateCarousel = () => {
    const images = document.querySelectorAll(".highlightImage");

    const center = Math.floor(images.length / 2);

    images.forEach((img, index) => {
      const distance = Math.abs(index - center);

      let scale = 1 - distance * 0.15;

      if (scale < 0.45) scale = 0.45;

      img.dataset.base = `scale(${scale})`;

      img.style.transform = `scale(${scale})`;

      img.style.zIndex = 100 - distance;

      img.style.boxShadow =
        distance === 0
          ? "0 30px 60px rgba(0,0,0,0.35)"
          : "0 10px 30px rgba(0,0,0,0.18)";
    });
  };

  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          height: "140px",
          padding: "0 80px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* LOGO */}
        <div>
          <img
            src="/logo.png"
            alt="Morada Logo"
            style={{
              height: "160px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* CENTER NAVBAR */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={navStyle}
            onMouseEnter={(e) => {
              e.target.style.background = "#dbeafe";
              e.target.style.boxShadow = "0 0 18px #93c5fd";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.boxShadow = "none";
            }}
          >
            Home
          </Link>

          <Link
            to="/gallery"
            style={navStyle}
            onMouseEnter={(e) => {
              e.target.style.background = "#dbeafe";
              e.target.style.boxShadow = "0 0 18px #93c5fd";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.boxShadow = "none";
            }}
          >
            Gallery & Store
          </Link>

          <Link
            to="/updates"
            style={navStyle}
            onMouseEnter={(e) => {
              e.target.style.background = "#dbeafe";
              e.target.style.boxShadow = "0 0 18px #93c5fd";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.boxShadow = "none";
            }}
          >
            Updates
          </Link>

          {/* ✅ CONTACT NOW WORKS FROM ANY PAGE */}
          <a
            href="/#contact"
            style={navStyle}
            onMouseEnter={(e) => {
              e.target.style.background = "#dbeafe";
              e.target.style.boxShadow = "0 0 18px #93c5fd";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.boxShadow = "none";
            }}
          >
            Contact
          </a>
        </nav>

        {/* RIGHT ACCOUNT BUTTON */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("is_admin");
                localStorage.removeItem("username");
                window.location.reload();
              }}
              style={{
                ...accountStyle,
                cursor: "pointer",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 20px #93c5fd";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                e.target.style.transform = "translateY(0px)";
              }}
            >
              👤 {username} | Logout
            </button>
          ) : (
            <Link
              to="/login"
              style={accountStyle}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 20px #93c5fd";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                e.target.style.transform = "translateY(0px)";
              }}
            >
              👤 Login
            </Link>
          )}
        </div>
      </header>

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <div>
              {/* HERO / ABOUT */}
              <section
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "100px 80px",
                  gap: "40px",
                  flexWrap: "wrap",
                  borderRadius: "20px",
                  margin: "40px",
                  background:
                    "linear-gradient(90deg, #dbeafe 0%, #e5e7eb 100%)",
                }}
              >
                {/* TEXT */}
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: "36px",
                      marginBottom: "20px",
                      color: "#111",
                    }}
                  >
                    ABOUT ME
                  </h2>

                  <p
                    style={{
                      lineHeight: "1.9",
                      color: "#555",
                      fontSize: "16px",
                    }}
                  >
                    Mohamed Yousif, aka "Morada," is a Sudanese visual artist,
                    an illustrator, a graphic designer, and a psychologist. He
                    is an established artist; his work revolves around human
                    identity, daily life, and historical patterns. Morada
                    believes that any arts project has many references to
                    establishing its general vision and direction. His painting
                    is a continuous and dynamic dialogue through which he
                    engages with the surrounding cultural environment, striving
                    to offer an additional perspective on the overall artistic
                    output. He employs high abstraction in historical symbols,
                    adding a unique design touch to create a vocabulary that
                    contributes to crafting a truly personal and distinctive
                    internal discourse. Duality: He approaches duality in my
                    artistic project at different levels to arrive at a language
                    that aligns with the overall vision. On the level of formal
                    elements, this includes straight and curved lines, The
                    interplay of black and white, the juxtaposition and contrast
                    of forms in direct and indirect dialogues and length and
                    width.
                  </p>
                </div>

                {/* IMAGE */}
                <div style={{ flex: 1.2, textAlign: "center" }}>
                  <img
                    src="/artist.png"
                    alt="Artist"
                    style={{
                      width: "100%",
                      maxWidth: "800px",
                      objectFit: "contain",
                      transform: "translateX(40px)",
                    }}
                  />
                </div>
              </section>

              {/* ✨ HIGHLIGHTS SECTION */}
              {/* ✨ HIGHLIGHTS SECTION */}
              <section
                style={{
                  padding: "120px 20px",
                  overflow: "hidden",
                  background: "#fff",
                  position: "relative",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    fontSize: "42px",
                    marginBottom: "70px",
                    letterSpacing: "2px",
                  }}
                >
                  Highlights
                </h2>

                {(() => {
                  const images = [
                    "/pic1.png",
                    "/pic2.png",
                    "/pic3.png",
                    "/pic4.png",
                    "/pic5.png",
                    "/pic6.png",
                    "/pic7.png",
                    "/pic8.png",
                    "/pic9.png",
                    "/pic10.png",
                  ];

                  return (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "650px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* LEFT BUTTON */}
                      <button
                        onClick={() => {
                          const track =
                            document.getElementById("carouselTrack");

                          track.appendChild(track.firstChild);

                          updateCarousel();
                        }}
                        style={{
                          position: "absolute",
                          left: "20px",
                          zIndex: 200,
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          border: "none",
                          cursor: "pointer",
                          background: "rgba(255,255,255,0.85)",
                          backdropFilter: "blur(10px)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          fontSize: "30px",
                        }}
                      >
                        ‹
                      </button>

                      {/* RIGHT BUTTON */}
                      <button
                        onClick={() => {
                          const track =
                            document.getElementById("carouselTrack");

                          track.prepend(track.lastChild);

                          updateCarousel();
                        }}
                        style={{
                          position: "absolute",
                          right: "20px",
                          zIndex: 200,
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          border: "none",
                          cursor: "pointer",
                          background: "rgba(255,255,255,0.85)",
                          backdropFilter: "blur(10px)",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          fontSize: "30px",
                        }}
                      >
                        ›
                      </button>

                      {/* CAROUSEL */}
                      <div
                        id="carouselTrack"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0px",
                          width: "100%",
                          transition: "0.6s ease",
                        }}
                      >
                        {images.map((img, index) => {
                          const center = 4;

                          const distance = Math.abs(index - center);

                          let scale = 1 - distance * 0.15;

                          if (scale < 0.45) scale = 0.45;

                          return (
                            <img
                              key={index}
                              src={img}
                              alt=""
                              onClick={(e) => {
                                document
                                  .querySelectorAll(".highlightImage")
                                  .forEach((el) => {
                                    el.style.transform = el.dataset.base;
                                  });

                                e.currentTarget.style.transform = `${e.currentTarget.dataset.base} scale(1.18)`;
                              }}
                              className="highlightImage"
                              data-base={`scale(${scale})`}
                              style={{
                                width: "320px",
                                height: "480px",
                                objectFit: "cover",
                                borderRadius: "35px",
                                marginLeft: "-40px",
                                marginRight: "-40px",

                                transform: `scale(${scale})`,
                                zIndex: 100 - distance,

                                transition: "0.5s cubic-bezier(0.22,1,0.36,1)",

                                boxShadow:
                                  distance === 0
                                    ? "0 30px 60px rgba(0,0,0,0.35)"
                                    : "0 10px 30px rgba(0,0,0,0.18)",

                                cursor: "pointer",
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </section>

              {/* CONTACT */}
              <section
                id="contact"
                style={{
                  padding: "100px 50px 40px",
                  borderTop: "1px solid #eee",
                  marginTop: "80px",
                  background: "#fafafa",
                }}
              >
                <div
                  style={{
                    maxWidth: "900px",
                    margin: "auto",
                  }}
                >
                  <h2
                    style={{
                      marginBottom: "20px",
                      fontSize: "38px",
                      textAlign: "center",
                      color: "#111",
                    }}
                  >
                    Contact
                  </h2>

                  <p
                    style={{
                      color: "#555",
                      lineHeight: "1.8",
                      marginBottom: "50px",
                      textAlign: "center",
                      maxWidth: "700px",
                      marginInline: "auto",
                    }}
                  >
                    For inquiries, collaborations, exhibitions, artwork
                    purchases, or creative partnerships, feel free to send a
                    message.
                  </p>

                  {/* CONTACT FORM */}
                  <form
                    action="https://formsubmit.co/moradamanage@gmail.com"
                    method="POST"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      maxWidth: "700px",
                      margin: "auto",
                    }}
                  >
                    {/* Disable captcha */}
                    <input type="hidden" name="_captcha" value="false" />

                    {/* Redirect after submit */}
                    <input
                      type="hidden"
                      name="_next"
                      value="https://morada.art/"
                    />

                    {/* Email subject */}
                    <input
                      type="hidden"
                      name="_subject"
                      value="New MORADA Contact Message"
                    />

                    {/* Better email layout */}
                    <input type="hidden" name="_template" value="table" />

                    {/* Auto reply to sender */}
                    <input
                      type="hidden"
                      name="_autoresponse"
                      value="Thank you for contacting MORADA. Your message has been received."
                    />

                    {/* NAME */}
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      style={{
                        padding: "16px",
                        borderRadius: "16px",
                        border: "1px solid #ddd",
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />

                    {/* EMAIL */}
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      style={{
                        padding: "16px",
                        borderRadius: "16px",
                        border: "1px solid #ddd",
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />

                    {/* MESSAGE */}
                    <textarea
                      name="message"
                      placeholder="Write your message here..."
                      required
                      rows="7"
                      style={{
                        padding: "16px",
                        borderRadius: "16px",
                        border: "1px solid #ddd",
                        fontSize: "15px",
                        resize: "vertical",
                        outline: "none",
                      }}
                    />

                    {/* BUTTON */}
                    <button
                      type="submit"
                      style={{
                        padding: "16px",
                        borderRadius: "18px",
                        border: "none",
                        background: "#111",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#2563eb";
                        e.target.style.boxShadow = "0 0 20px #93c5fd";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#111";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Send Message
                    </button>
                  </form>

                  {/* EMAIL */}
                  <div
                    style={{
                      marginTop: "50px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#111",
                        fontSize: "16px",
                      }}
                    >
                      Email: mohamedmorda4@gmail.com
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div
                    style={{
                      borderTop: "1px solid #ddd",
                      marginTop: "80px",
                      paddingTop: "25px",
                      textAlign: "center",
                      color: "#777",
                      fontSize: "14px",
                    }}
                  >
                    © 2026 MORADA. All Rights Reserved.
                  </div>
                </div>
              </section>
            </div>
          }
        />

        {/* OTHER PAGES */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
