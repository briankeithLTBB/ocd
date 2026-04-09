"use client";
import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// SITE DATA — Cowork updates this section to change the site
// ═══════════════════════════════════════════════════════════════
const PRODUCTS = [
  {
    id: "n3-bundle",
    name: "Narcissist Bundle",
    tag: "Best Value",
    description: "Everything you need. Soap + 2 Scented Laundry Balls + Scent Refill.",
    price: 25.0,
    color: "#7F77DD",
    image: "/images/p_Narcissist Bundle.jpeg",
  },
  {
    id: "n3-soap",
    name: "Narcissist Soap",
    tag: null,
    description: "One batch of our signature scented laundry soap. Your closet will thank you.",
    price: 20.0,
    color: "#1D9E75",
    image: "/images/p_Narcissist Soap.jpeg",
  },
  {
    id: "n3-slb",
    name: "Scented Laundry Balls",
    tag: "Try Me",
    description: "2 wool dryer balls + 1 scent refill dropper. Toss them in. Smell incredible.",
    price: 6.0,
    color: "#378ADD",
    image: "/images/p_Scented Laundry Balls.jpeg",
  },
  {
    id: "f3-soap",
    name: "Fragrance Free",
    tag: null,
    description: "Same obsessive clean — zero fragrance. For sensitive skin, babies, and pure lovers.",
    price: 14.0,
    color: "#888780",
    image: "/images/p_Narcissist Soap.jpeg",
  },
];

const TESTIMONIALS = [
  { quote: "My whole closet smells like fresh laundry now. I'm obsessed.", name: "Jasmine T.", location: "Irving, TX" },
  { quote: "My kid's skin finally stopped breaking out after we switched.", name: "Marcus R.", location: "Dallas, TX" },
  { quote: "Shelbey's detergent is the only reason my whites are actually white.", name: "Denise W.", location: "Grand Prairie, TX" },
  { quote: "I've been using this for 3 weeks and my robe has never smelled better.", name: "Ray B.", location: "Dallas, TX" },
];

const UPCOMING_EVENTS = [
  // Cowork: add events here as they're confirmed
  // { name: "Mansfield Earth Day", date: "Apr 25-26", location: "620 S. Wisteria St, Mansfield TX" },
];

const SAFETY_BADGES = [
  "Hypoallergenic",
  "No Harsh Chemicals",
  "Skin Safe",
  "HE Machine Safe",
  "Cold Wash Friendly",
];

const INGREDIENTS = [
  "Washing Soda",
  "Coconut Laundry Soap",
  "Sodium Citrate",
  "OxiClean Stain Remover",
];

// ═══════════════════════════════════════════════════════════════

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
`;

const Section = ({ children, id, bg = "transparent", style = {} }) => (
  <section id={id} style={{ padding: "5rem 1.5rem", background: bg, ...style }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
  </section>
);

const Badge = ({ text, color }) => (
  <span
    style={{
      display: "inline-block",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "4px 12px",
      borderRadius: 100,
      background: color + "18",
      color: color,
    }}
  >
    {text}
  </span>
);

export default function OCDByShelbeySite() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter((i) => i.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Something went wrong. Please try again.");
      setCheckoutLoading(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a18", background: "#FDFCF9", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{fonts + `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #7F77DD33; }
        input, select, textarea { font-family: 'DM Sans', sans-serif; }
        .nav-link { color: #5a5a56; text-decoration: none; font-size: 13px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #1a1a18; }
        .product-card { background: #fff; border: 1px solid #e8e6e0; border-radius: 16px; padding: 2rem 1.75rem; transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; }
        .product-card:hover { border-color: #ccc; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.06); }
        .cta-btn { display: inline-block; background: #1a1a18; color: #FDFCF9; border: none; padding: 16px 36px; border-radius: 100px; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.25s ease; letter-spacing: 0.02em; text-decoration: none; }
        .cta-btn:hover { background: #333; transform: translateY(-1px); }
        .cta-btn-outline { display: inline-block; background: transparent; color: #1a1a18; border: 1.5px solid #1a1a18; padding: 14px 32px; border-radius: 100px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.25s ease; letter-spacing: 0.02em; }
        .cta-btn-outline:hover { background: #1a1a18; color: #FDFCF9; }
        .safety-pill { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 100px; background: #fff; border: 1px solid #e8e6e0; font-size: 14px; color: #444; font-weight: 400; }
        .form-input { width: 100%; padding: 14px 18px; border: 1.5px solid #e0ddd6; border-radius: 12px; font-size: 15px; background: #fff; color: #1a1a18; outline: none; transition: border 0.2s; }
        .form-input:focus { border-color: #7F77DD; }
        .form-input::placeholder { color: #b0ada5; }
        .testimonial-card { background: #fff; border: 1px solid #e8e6e0; border-radius: 16px; padding: 2rem; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .hero-grid { flex-direction: column !important; text-align: center; }
          .hero-text h1 { font-size: 2.2rem !important; }
          .product-grid { grid-template-columns: 1fr !important; }
          .story-grid { grid-template-columns: 1fr !important; }
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .safety-wrap { justify-content: center !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .mobile-nav-menu { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
          .mobile-nav-menu { display: none !important; }
        }
      `}</style>

      {/* ─── ANNOUNCEMENT BANNER ─── */}
      <div style={{ background: "#1a1a18", color: "#FDFCF9", textAlign: "center", padding: "10px 1rem", fontSize: 13, fontWeight: 400, letterSpacing: "0.04em" }}>
        Local DFW Pickup Available — Reserve yours today
      </div>

      {/* ─── NAV ─── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#FDFCF9ee", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8e6e0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <span style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em" }}>OCD</span>
            <span style={{ fontSize: 12, color: "#888", fontWeight: 400 }}>by Shelbey</span>
          </div>
          <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <span className="nav-link" onClick={() => scrollTo("products")}>Shop</span>
            <span className="nav-link" onClick={() => scrollTo("story")}>Our Story</span>
            <span className="nav-link" onClick={() => scrollTo("find-us")}>Find Us</span>
            <span className="nav-link" onClick={() => scrollTo("footer")}>Contact</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => setCartOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: 8, display: "flex", alignItems: "center" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: 2, right: 2, background: "#7F77DD", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </button>
          <div className="mobile-toggle" style={{ display: "none", cursor: "pointer", padding: 8 }} onClick={() => setMobileNav(!mobileNav)}>
            <div style={{ width: 22, height: 2, background: "#1a1a18", marginBottom: 5 }} />
            <div style={{ width: 22, height: 2, background: "#1a1a18", marginBottom: 5 }} />
            <div style={{ width: 16, height: 2, background: "#1a1a18" }} />
          </div>
          </div>
        </div>
        {mobileNav && (
          <div className="mobile-nav-menu" style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid #e8e6e0", background: "#FDFCF9" }}>
            {["products|Shop", "story|Our Story", "find-us|Find Us", "footer|Contact"].map((item) => {
              const [id, label] = item.split("|");
              return <span key={id} className="nav-link" onClick={() => scrollTo(id)} style={{ padding: "14px 1.5rem", borderBottom: "1px solid #f0ede6" }}>{label}</span>;
            })}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <Section id="hero" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <div className="hero-text" style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7F77DD", marginBottom: 16 }}>
              Obsessively Clean. No Compromises.
            </p>
            <h1 className="serif" style={{ fontSize: "3rem", fontWeight: 500, lineHeight: 1.15, color: "#1a1a18", marginBottom: 20, letterSpacing: "-0.02em" }}>
              Detergent made by someone who rewashes a sweater after one evening on the couch.
            </h1>
            <p style={{ fontSize: 17, color: "#6b6b66", lineHeight: 1.6, marginBottom: 32, maxWidth: 480 }}>
              Small-batch, skin-safe, obsessively formulated — handmade in Dallas.
            </p>
            <button className="cta-btn" onClick={() => scrollTo("reserve")}>Reserve Your First Batch</button>
          </div>
          <div style={{ flex: "0 0 380px", position: "relative" }}>
            <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: 20, overflow: "hidden", background: "#f0ede6" }}>
              <img
                src="/images/hero_1.jpg"
                alt="Shelbey holding OCD by Shelbey detergent"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}

              />
            </div>
            <div style={{ position: "absolute", bottom: -16, right: -16, background: "#1a1a18", color: "#FDFCF9", borderRadius: 14, padding: "14px 20px", fontSize: 13, fontWeight: 500, letterSpacing: "0.02em" }}>
              Made in Dallas, TX ✦
            </div>
          </div>
        </div>
      </Section>

      {/* ─── PRODUCTS ─── */}
      <Section id="products" bg="#f7f5f0">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>The lineup</p>
          <h2 className="serif" style={{ fontSize: "2.2rem", fontWeight: 500, letterSpacing: "-0.01em" }}>
            For people who think "kind of clean" isn't clean enough
          </h2>
        </div>
        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} className="product-card">
              {p.tag && (
                <div style={{ position: "absolute", top: 16, right: 16 }}>
                  <Badge text={p.tag} color={p.color} />
                </div>
              )}
              <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: 12, overflow: "hidden", background: p.color + "14", marginBottom: 20 }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}>{p.name}</h3>
              <p style={{ fontSize: 14, color: "#777", lineHeight: 1.55, marginBottom: 20, minHeight: 60 }}>{p.description}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: 22, fontWeight: 600, color: "#1a1a18" }}>${p.price.toFixed(2)}</span>
                  <span style={{ fontSize: 11, color: "#aaa", marginLeft: 4 }}>+tax & shipping</span>
                </div>
                <button
                  onClick={() => addToCart(p)}
                  style={{ fontSize: 13, color: "#FDFCF9", background: "#7F77DD", border: "none", borderRadius: 100, padding: "8px 16px", fontWeight: 500, cursor: "pointer", transition: "background 0.2s" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── STORY ─── */}
      <Section id="story">
        <div className="story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>Our story</p>
            <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 20, letterSpacing: "-0.01em" }}>
              By Shelbey. Obsessively Made.
            </h2>
            <div style={{ fontSize: 16, color: "#555", lineHeight: 1.75 }}>
              <p style={{ marginBottom: 16 }}>
                OCD stands for Obsessively Clean Detergent. It started with Shelbey — a Dallas girl who runs projects at work and an obsessively clean home on her own time.
              </p>
              <p style={{ marginBottom: 16 }}>
                Her idea of "worn once" is reason enough to rewash a sweater, so her whole house smells like fresh laundry. Always.
              </p>
              <p style={{ marginBottom: 16 }}>
                She started making her own detergent because nothing on the shelf matched her standards — no harsh chemicals, no mystery ingredients, just clean. Friends tried it. Then their friends. Then people started asking where to buy it.
              </p>
              <p>
                This is that detergent. Small-batch. Handmade in Dallas. Made with the same obsessive care Shelbey puts into every load at home.
              </p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", aspectRatio: "1", borderRadius: 20, overflow: "hidden", background: "#f0ede6" }}>
              <img
                src="/images/IMG_1328.jpeg"
                alt="Shelbey making detergent"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}

              />
            </div>
          </div>
        </div>
      </Section>

      {/* ─── SAFE FOR SKIN ─── */}
      <Section bg="#f7f5f0">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 12 }}>
            Safe for Skin, Clothes & Your Home
          </h2>
          <p style={{ fontSize: 16, color: "#777", maxWidth: 500, margin: "0 auto" }}>
            Gentle, effective, and made without mystery ingredients.
          </p>
        </div>
        <div className="safety-wrap" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: "2rem" }}>
          {SAFETY_BADGES.map((b) => (
            <div key={b} className="safety-pill">
              <span style={{ color: "#1D9E75", fontSize: 15, fontWeight: 600 }}>✓</span> {b}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "#888", marginBottom: 6 }}>
            <span style={{ fontWeight: 500, color: "#666" }}>Made with:</span>{" "}
            {INGREDIENTS.join(" · ")}
          </p>
          <p style={{ fontSize: 13, color: "#aaa" }}>
            No sulfates. No parabens. No synthetic dyes. No fillers.
          </p>
        </div>
      </Section>

      {/* ─── HOW IT WORKS ─── */}
      <Section id="reserve">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>How it works</p>
          <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500 }}>
            Order Online. We'll Handle the Rest.
          </h2>
        </div>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: "3.5rem" }}>
          {[
            { step: "01", title: "Add to cart", desc: "Pick your products and head to checkout." },
            { step: "02", title: "Pay securely", desc: "Checkout powered by Square — card, Apple Pay, or Google Pay." },
            { step: "03", title: "We ship or you pick up", desc: "Local DFW pickup available. Ships within 2–3 days." },
          ].map((s) => (
            <div key={s.step} style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
              <div style={{ fontSize: 36, fontWeight: 300, color: "#d0cdc6", marginBottom: 12, fontFamily: "'Playfair Display', serif" }}>{s.step}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#777", lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="cta-btn" onClick={() => scrollTo("products")}>Shop Now</button>
        </div>
      </Section>

      {/* ─── TESTIMONIALS ─── */}
      <Section bg="#f7f5f0">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>Real people, real loads</p>
          <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500 }}>
            This Is Literally Who We Make It For.
          </h2>
        </div>
        <div className="testimonial-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div style={{ fontSize: 28, color: "#d0cdc6", marginBottom: 12, fontFamily: "'Playfair Display', serif" }}>"</div>
              <p style={{ fontSize: 16, color: "#333", lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>
                {t.quote}
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>
                — {t.name}, <span style={{ fontWeight: 400 }}>{t.location}</span>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── FIND US ─── */}
      <Section id="find-us">
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>Find us</p>
          <h2 className="serif" style={{ fontSize: "2rem", fontWeight: 500, marginBottom: 16 }}>
            Where to Find Us
          </h2>
          <p style={{ fontSize: 16, color: "#777", maxWidth: 460, margin: "0 auto 2rem" }}>
            We're popping up at markets and events across DFW. Follow{" "}
            <a href="https://instagram.com/ocdbyshelbey" target="_blank" rel="noopener noreferrer" style={{ color: "#7F77DD", textDecoration: "none", fontWeight: 500 }}>
              @ocdbyshelbey
            </a>{" "}
            on Instagram for the latest dates.
          </p>
          {UPCOMING_EVENTS.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500, margin: "0 auto" }}>
              {UPCOMING_EVENTS.map((ev, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "#fff", border: "1px solid #e8e6e0", borderRadius: 12 }}>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontWeight: 600, fontSize: 15 }}>{ev.name}</p>
                    <p style={{ fontSize: 13, color: "#888" }}>{ev.location}</p>
                  </div>
                  <Badge text={ev.date} color="#7F77DD" />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "2rem", background: "#fff", border: "1px solid #e8e6e0", borderRadius: 16, maxWidth: 420, margin: "0 auto" }}>
              <p style={{ fontSize: 15, color: "#999" }}>Upcoming events dropping soon.</p>
              <p style={{ fontSize: 13, color: "#bbb", marginTop: 6 }}>Follow us on Instagram to be the first to know.</p>
            </div>
          )}
        </div>
      </Section>

      {/* ─── CART DRAWER ─── */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.4)" }} onClick={() => setCartOpen(false)} />
          <div style={{ width: 400, maxWidth: "100vw", background: "#FDFCF9", display: "flex", flexDirection: "column", boxShadow: "-4px 0 30px rgba(0,0,0,0.1)" }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid #e8e6e0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600 }}>Your Cart ({cartCount})</h3>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#888", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
              {cart.length === 0 ? (
                <p style={{ color: "#aaa", fontSize: 14, textAlign: "center", marginTop: "3rem" }}>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "1rem 0", borderBottom: "1px solid #f0ede6" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", background: item.color + "14", flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{item.name}</p>
                      <p style={{ fontSize: 13, color: "#888" }}>${item.price.toFixed(2)} +tax & shipping</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ width: 28, height: 28, border: "1px solid #e0ddd6", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontSize: 14, fontWeight: 500, minWidth: 16, textAlign: "center" }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ width: 28, height: 28, border: "1px solid #e0ddd6", borderRadius: 6, background: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: "1.5rem", borderTop: "1px solid #e8e6e0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 14, color: "#555" }}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16 }}>Tax & shipping calculated at checkout</p>
                <button
                  className="cta-btn"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  style={{ width: "100%", textAlign: "center", opacity: checkoutLoading ? 0.7 : 1 }}
                >
                  {checkoutLoading ? "Redirecting..." : "Checkout"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <footer id="footer" style={{ background: "#1a1a18", borderTop: "1px solid #2a2a28", padding: "2.5rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 16, color: "#FDFCF9" }}>OCD</span>
              <span style={{ fontSize: 12, color: "#666" }}>by Shelbey</span>
            </div>
            <p style={{ fontSize: 13, color: "#555" }}>Made in Dallas, TX with obsessive attention to clean.</p>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <span className="nav-link" onClick={() => scrollTo("story")} style={{ color: "#777" }}>Our Story</span>
            <span className="nav-link" onClick={() => scrollTo("find-us")} style={{ color: "#777" }}>Find Us</span>
            <a href="https://instagram.com/ocdbyshelbey" target="_blank" rel="noopener noreferrer" style={{ color: "#777", fontSize: 13, textDecoration: "none", fontWeight: 500 }}>
              @ocdbyshelbey
            </a>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "1.5rem auto 0", paddingTop: "1.5rem", borderTop: "1px solid #2a2a28", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#444" }}>© 2026 Obsessively Clean Detergent by Shelbey. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
