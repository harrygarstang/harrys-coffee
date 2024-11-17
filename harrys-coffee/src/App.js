import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      {/* Hero Section */}
      <section
  className="relative min-h-screen flex flex-col justify-center items-center text-cream"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('image.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'bottom', // Focus on the bottom half of the image
  }}
>
  <h1 className="text-5xl font-bold">you don't deserve bad coffee.</h1>
  <p className="mt-4 text-xl max-w-2xl text-center">
    I spend my weekends trying out new coffee shops, so that you don't 
  </p>
  <button className="mt-10 bg-gradient-to-r from-brown to-tan text-cream px-6 py-3 rounded-lg shadow-md hover:from-tan hover:to-darkBrown">
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

        {/* Filters and Switch View */}
        <div className="flex justify-between items-center mt-8 bg-tan p-4 rounded-lg shadow-md">
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

          <button
            onClick={() => setView(view === "list" ? "map" : "list")}
            className="bg-brown text-cream px-6 py-3 rounded-lg shadow-md hover:bg-darkBrown"
          >
            {view === "list" ? "Switch to Map View" : "Switch to List View"}
          </button>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mt-4">
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
              className={`px-3 py-1 rounded-full text-sm font-medium shadow-md transition-colors duration-200 ${filters.tags.includes(tag)
                  ? "bg-brown text-cream" // Selected state
                  : "bg-cream text-darkBrown hover:bg-brown hover:text-cream" // Default state
                }`}
            >
              {tag}
            </button>
          ))}
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
