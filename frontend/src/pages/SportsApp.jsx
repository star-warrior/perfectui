import { useState } from "react";

export default function RallyPlayUI() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#333333] font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">RallyPlay</h1>
        <div className="flex gap-6">
          {["home", "facilities", "booking", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize font-medium transition ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-64 bg-[url('/facility.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-[#1E4929] opacity-70"></div>
        <h2 className="relative text-white text-4xl font-bold">
          Book Your Play
        </h2>
      </header>

      {/* Tabs */}
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        {activeTab === "home" && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Welcome to RallyPlay</h2>
            <p className="text-lg mb-6">
              Easily book your favorite sports facilities with a clean and
              modern interface.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-[#333333] transition">
              Get Started
            </button>
          </section>
        )}

        {activeTab === "facilities" && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Available Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={`/facility${i}.jpg`}
                    alt={`Facility ${i}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">Facility {i}</h3>
                    <p className="text-gray-600 mt-2">
                      Great place to play and enjoy with friends.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "booking" && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Book a Facility</h2>
            <form className="bg-white p-6 rounded-xl shadow-md max-w-lg">
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Choose Facility
                </label>
                <select className="w-full border border-gray-300 rounded-md p-3 focus:border-gray-600">
                  <option>Tennis Court</option>
                  <option>Football Turf</option>
                  <option>Basketball Court</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md p-3 focus:border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Time</label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-md p-3 focus:border-gray-600"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-[#333333] transition"
              >
                Confirm Booking
              </button>
            </form>
          </section>
        )}

        {activeTab === "profile" && (
          <section>
            <h2 className="text-3xl font-bold mb-6">My Profile</h2>
            <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
              <div className="flex items-center gap-4">
                <img
                  src="/user.jpg"
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-gray-600">Sports Enthusiast</p>
                </div>
              </div>
              <button className="mt-6 bg-transparent border border-black text-black px-6 py-2 rounded-md font-medium hover:bg-[#EEEEEE] transition">
                Edit Profile
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white text-black py-6 mt-12 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between">
          <p className="text-sm">© 2025 RallyPlay. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#333333]">
              Facebook
            </a>
            <a href="#" className="hover:text-[#333333]">
              Twitter
            </a>
            <a href="#" className="hover:text-[#333333]">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
