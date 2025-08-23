import React, { useState } from "react";
import {
  Search,
  Filter,
  Bell,
  Home,
  BarChart3,
  FileText,
  Wallet,
  Mail,
  MessageSquare,
  UserPlus,
  TrendingUp,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./Preview.css";

const Preview = ({ palette }) => {
  const [activeNav, setActiveNav] = useState("home");

  // Sample data for charts
  const visitorsData = [
    { day: 1, visitors: 140 },
    { day: 2, visitors: 220 },
    { day: 3, visitors: 180 },
    { day: 4, visitors: 250 },
    { day: 5, visitors: 200 },
    { day: 6, visitors: 190 },
    { day: 7, visitors: 240 },
    { day: 8, visitors: 210 },
    { day: 9, visitors: 180 },
    { day: 10, visitors: 160 },
    { day: 11, visitors: 140 },
    { day: 12, visitors: 120 },
    { day: 13, visitors: 100 },
  ];

  const priceData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    offer: Math.floor(Math.random() * 30000) + 40000,
    listed: Math.floor(Math.random() * 40000) + 60000,
  }));

  const pieData = [
    { name: "Vacant", value: 63, color: "var(--color-white)" },
    { name: "Occupied", value: 42, color: "var(--color-text-secondary)" },
    { name: "Unlisted", value: 45, color: "var(--color-accent)" },
  ];

  const barData = [
    { name: "Texas", value: 1400, color: "var(--color-white)" },
    { name: "California", value: 1800, color: "var(--color-white)" },
    { name: "New York", value: 1200, color: "var(--color-white)" },
  ];

  const navItems = [
    { icon: Home, key: "home" },
    { icon: BarChart3, key: "analytics" },
    { icon: FileText, key: "documents" },
    { icon: Wallet, key: "wallet" },
    { icon: Mail, key: "mail" },
  ];

  // CSS styles as a style object to inject root variables from dynamic palette
  const rootStyles = {
    "--color-bg-primary": palette?.["color-bg-primary"] || "#15202b",
    "--color-bg-secondary": palette?.["color-bg-secondary"] || "#192734",
    "--color-bg-tertiary": palette?.["color-bg-tertiary"] || "#22303c",
    "--color-text-secondary": palette?.["color-text-secondary"] || "#8899ac",
    "--color-white": palette?.["color-white"] || "#ffffff",
    "--color-accent": palette?.["color-accent"] || "#22303c",
  };

  return (
    <div
      style={rootStyles}
      className="min-h-screen bg-[var(--color-bg-primary)] flex"
    >
      {/* Sidebar */}
      <div className="w-16 bg-[var(--color-bg-secondary)] flex flex-col items-center py-6">
        {/* Logo */}
        <div className="w-12 h-12 bg-[var(--color-bg-primary)] rounded-xl flex items-center justify-center mb-8">
          <div className="w-6 h-6 bg-[var(--color-white)] rounded-sm"></div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4">
          {navItems.map(({ icon: Icon, key }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={`p-3 rounded-lg transition-colors ${
                activeNav === key
                  ? "bg-[var(--color-white)] text-[var(--color-bg-secondary)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-white)] hover:bg-[var(--color-bg-tertiary)]"
              }`}
            >
              <Icon size={20} />
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[var(--color-white)]">
              Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-white)] focus:border-transparent text-[var(--color-white)] placeholder-[var(--color-text-secondary)]"
                />
              </div>
              <button className="p-2 border border-[var(--color-bg-tertiary)] rounded-lg hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-white)]">
                <Filter size={16} />
              </button>
              <button className="p-2 border border-[var(--color-bg-tertiary)] rounded-lg hover:bg-[var(--color-bg-secondary)] relative text-[var(--color-text-secondary)] hover:text-[var(--color-white)]">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-white)] rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[var(--color-bg-tertiary)] to-[var(--color-bg-secondary)] rounded-2xl p-6 mb-6 text-[var(--color-white)] relative overflow-hidden border border-[var(--color-bg-tertiary)]">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  Welcome back, John
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  This is your property portfolio report
                </p>

                {/* Stats Circle */}
                <div className="flex items-center space-x-6">
                  <div className="relative w-24 h-24">
                    <svg
                      className="w-24 h-24 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="var(--color-white)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(63 / 150) * 251} 251`}
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="var(--color-text-secondary)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(42 / 150) * 251} 251`}
                        strokeDashoffset={`-${(63 / 150) * 251}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        Total
                      </span>
                      <span className="text-xl font-bold">150</span>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[var(--color-white)] rounded-full"></div>
                      <span className="text-[var(--color-text-secondary)]">
                        63 Vacant
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[var(--color-text-secondary)] rounded-full"></div>
                      <span className="text-[var(--color-text-secondary)]">
                        42 Occupied
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[var(--color-bg-tertiary)] rounded-full"></div>
                      <span className="text-[var(--color-text-secondary)]">
                        45 Unlisted
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Image */}
              <div className="w-48 h-32 bg-[var(--color-bg-primary)] rounded-lg overflow-hidden ml-6 border border-[var(--color-bg-tertiary)]">
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop"
                  alt="Property"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 shadow-lg border border-[var(--color-bg-tertiary)]">
              <div className="flex items-center justify-between mb-4">
                <MessageSquare
                  className="text-[var(--color-white)]"
                  size={24}
                />
                <ChevronUp className="text-[var(--color-white)]" size={16} />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                Inquiry Message
              </p>
              <p className="text-3xl font-bold text-[var(--color-white)]">19</p>
            </div>

            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 shadow-lg border border-[var(--color-bg-tertiary)]">
              <div className="flex items-center justify-between mb-4">
                <UserPlus className="text-[var(--color-white)]" size={24} />
                <ChevronUp className="text-[var(--color-white)]" size={16} />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                New Applicant
              </p>
              <p className="text-3xl font-bold text-[var(--color-white)]">67</p>
            </div>

            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 shadow-lg border border-[var(--color-bg-tertiary)]">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="text-[var(--color-white)]" size={24} />
                <ChevronUp className="text-[var(--color-white)]" size={16} />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                Property Sales
              </p>
              <p className="text-3xl font-bold text-[var(--color-white)]">
                180
              </p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Visitors Chart */}
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 shadow-lg border border-[var(--color-bg-tertiary)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-white)]">
                  Average visitors
                </h3>
                <MoreHorizontal
                  className="text-[var(--color-text-secondary)]"
                  size={20}
                />
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitorsData}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "var(--color-text-secondary)",
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 12,
                        fill: "var(--color-text-secondary)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="visitors"
                      stroke="var(--color-white)"
                      strokeWidth={3}
                      dot={false}
                      fill="var(--color-white)"
                      fillOpacity={0.1}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="px-3 py-1 bg-[var(--color-white)] text-[var(--color-bg-secondary)] text-sm rounded-md">
                  1 Day
                </button>
                <button className="px-3 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] text-sm rounded-md">
                  1 Week
                </button>
                <button className="px-3 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] text-sm rounded-md">
                  1 Month
                </button>
                <button className="px-3 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] text-sm rounded-md">
                  1 Year
                </button>
                <button className="px-3 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] text-sm rounded-md">
                  All time
                </button>
              </div>
            </div>

            {/* Price Comparison Chart */}
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 shadow-lg border border-[var(--color-bg-tertiary)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-white)]">
                  Listed vs offer price for rejection
                </h3>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  See details
                </span>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--color-white)] rounded-full"></div>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    Offer price $76,000k
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--color-text-secondary)] rounded-full"></div>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    Listed price $90,000k
                  </span>
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priceData.slice(0, 20)}>
                    <Bar dataKey="offer" fill="var(--color-white)" />
                    <Bar dataKey="listed" fill="var(--color-text-secondary)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Our Property Section */}
          <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 shadow-lg border border-[var(--color-bg-tertiary)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[var(--color-white)]">
                Our property
              </h3>
              <span className="text-sm text-[var(--color-text-secondary)]">
                See all
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[var(--color-bg-tertiary)] rounded-lg p-4 h-24 flex items-center justify-center text-[var(--color-white)] font-medium border border-[var(--color-bg-tertiary)]"
                >
                  Property {i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-6 bg-[var(--color-bg-primary)]">
          <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 shadow-lg border border-[var(--color-bg-tertiary)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[var(--color-white)]">
                Properties & Location
              </h3>
              <span className="text-sm text-[var(--color-text-secondary)]">
                See all
              </span>
            </div>

            {/* Location Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--color-white)]">
                  1400
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  UNITS
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--color-white)]">
                  1800+
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  UNITS
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--color-white)]">
                  1200
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  UNITS
                </p>
              </div>
            </div>

            {/* Bar Chart for Locations */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="horizontal">
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-text-secondary)" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-text-secondary)" }}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--color-white)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between text-sm mt-4">
              <span className="text-[var(--color-white)] font-medium">
                Texas
              </span>
              <span className="text-[var(--color-white)] font-medium">
                California
              </span>
              <span className="text-[var(--color-white)] font-medium">
                New York
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
