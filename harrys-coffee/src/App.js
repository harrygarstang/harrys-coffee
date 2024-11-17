import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Placeholder Data
const coffeeShops = [
  {
    id: 1,
    name: "The Grind",
    location: "London",
    tags: ["cozy", "good for working"],
    quote: "A perfect spot for productivity!",
    photos: ["https://via.placeholder.com/300"],
    review: "This is a fantastic coffee shop in the heart of London. Great for getting work done or relaxing with a book.",
  },
  {
    id: 2,
    name: "Java Jive",
    location: "Bristol",
    tags: ["bring your book", "friendly staff"],
    quote: "You'll love the vibe here!",
    photos: ["https://via.placeholder.com/300"],
    review: "A charming spot with wonderful staff and great coffee. Perfect for reading or chatting with friends.",
  },
];

function Home() {
  const [view, setView] = useState("list"); // Toggle between "list" and "map"
  const [filters, setFilters] = useState({ location: "all", tags: [] }); // Filter state
  const [selectedCard, setSelectedCard] = useState(null); // Card expansion state

  // Handle filters
  const filteredShops = coffeeShops.filter((shop) => {
    const matchesLocation = filters.location === "all" || shop.location === filters.location;
    const matchesTags =
      filters.tags.length === 0 || filters.tags.every((tag) => shop.tags.includes(tag));
    return matchesLocation && matchesTags;
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Navbar */}
      <nav className="bg-brown text-cream p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Coffee Blog</Link>
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setView(view === "list" ? "map" : "list")}
              className="bg-tan text-darkBrown px-4 py-2 rounded-lg shadow-md hover:bg-brown hover:text-cream"
            >
              {view === "list" ? "Switch to Map View" : "Switch to List View"}
            </button>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-brown text-cream min-h-screen flex flex-col justify-center items-center pt-16">
        <h1 className="text-5xl font-bold">Welcome to My Coffee Blog</h1>
        <p className="mt-4 text-xl max-w-2xl text-center">
          Hi, I'm [Your Name], a coffee enthusiast sharing my favorite coffee shops, reviews, and experiences.
        </p>
        <button
          onClick={() => document.getElementById("main-feature").scrollIntoView({ behavior: "smooth" })}
          className="mt-10 bg-tan text-darkBrown px-6 py-3 rounded-lg shadow-md hover:bg-brown hover:text-cream"
        >
          Explore My Coffee Journey
        </button>
        <div className="absolute bottom-10 animate-bounce">
          <span className="text-cream text-lg">Scroll Down ↓</span>
        </div>
      </section>

      {/* Main Feature Section */}
      <section id="main-feature" className="p-8 pt-24">
        <h2 className="text-3xl font-bold text-darkBrown text-center">Coffee Shops I Love</h2>
        <p className="text-center text-tan mt-2">Explore some of my favorite spots for coffee, work, and relaxation.</p>

        {/* Filters */}
        <div className="mt-8 bg-tan p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div>
              <label className="block mb-2 font-bold text-darkBrown">Filter by Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="p-2 rounded-lg border border-darkBrown text-darkBrown bg-cream"
              >
                <option value="all">All Locations</option>
                <option value="London">London</option>
                <option value="Bristol">Bristol</option>
                <option value="Worcester">Worcester</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-bold text-darkBrown">Filter by Tags</label>
              <div className="flex gap-2 flex-wrap">
                {["cozy", "good for working", "bring your book"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        tags: filters.tags.includes(tag)
                          ? filters.tags.filter((t) => t !== tag) // Unselect tag
                          : [...filters.tags, tag], // Select tag
                      })
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium shadow-md transition-colors duration-200 ${
                      filters.tags.includes(tag)
                        ? "bg-brown text-cream" // Selected state
                        : "bg-cream text-darkBrown hover:bg-brown hover:text-cream" // Default state
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* List or Map View */}
        {view === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl"
                onClick={() => setSelectedCard(shop)}
              >
                <img src={shop.photos[0]} alt={shop.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-darkBrown">{shop.name}</h3>
                  <p className="text-tan">{shop.quote}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {shop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-cream text-darkBrown px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-darkBrown">Map View Placeholder</div>
        )}
      </section>

      {/* Card Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 bg-tan text-darkBrown hover:bg-brown hover:text-cream rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-darkBrown">{selectedCard.name}</h2>
            <p className="text-gray-700 mt-4">{selectedCard.review}</p>
            {selectedCard.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-48 object-cover mt-4"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
