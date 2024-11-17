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
  // Add more entries as needed
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
    <div className="min-h-screen bg-gray-100">
      {/* Toggle Button */}
      <div className="p-4 flex justify-between items-center bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Coffee Blog</h1>
        <button
          onClick={() => setView(view === "list" ? "map" : "list")}
          className="px-4 py-2 bg-blue-800 rounded-lg shadow-md hover:bg-blue-700"
        >
          {view === "list" ? "Switch to Map View" : "Switch to List View"}
        </button>
      </div>

      {/* Filters */}
      <div className="p-4">
        <label className="block mb-2 font-bold">Filter by Location</label>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="p-2 rounded-lg border border-gray-300"
        >
          <option value="all">All Locations</option>
          <option value="London">London</option>
          <option value="Bristol">Bristol</option>
          <option value="Worcester">Worcester</option>
        </select>

        <div className="mt-4">
          <label className="block mb-2 font-bold">Filter by Tags</label>
          <div className="flex gap-4">
            {["cozy", "good for working", "bring your book"].map((tag) => (
              <label key={tag} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.tags.includes(tag)}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      tags: e.target.checked
                        ? [...filters.tags, tag]
                        : filters.tags.filter((t) => t !== tag),
                    })
                  }
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* List or Map View */}
      {view === "list" ? (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              onClick={() => setSelectedCard(shop)}
            >
              <img src={shop.photos[0]} alt={shop.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{shop.name}</h3>
                <p className="text-gray-600">{shop.quote}</p>
                <div className="flex gap-2 mt-2">
                  {shop.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
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
        <div className="p-4">Map View Placeholder</div>
      )}

      {/* Card Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 bg-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>

            {/* Card Content */}
            <h2 className="text-2xl font-bold">{selectedCard.name}</h2>
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
