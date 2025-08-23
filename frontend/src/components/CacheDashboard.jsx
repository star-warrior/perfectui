import React, { useState, useEffect } from "react";
import axios from "axios";

const CacheDashboard = () => {
  const [stats, setStats] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCacheData();
  }, []);

  const fetchCacheData = async () => {
    try {
      setLoading(true);
      const [statsRes, entriesRes] = await Promise.all([
        axios.get("/api/cache/stats"),
        axios.get("/api/cache/entries"),
      ]);

      setStats(statsRes.data.data);
      setEntries(entriesRes.data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch cache data");
      console.error("Cache dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    try {
      await axios.post("/api/cache/cleanup");
      await fetchCacheData(); // Refresh data
      alert("Cache cleanup completed successfully!");
    } catch (err) {
      alert("Failed to cleanup cache");
      console.error("Cleanup error:", err);
    }
  };

  const handleInvalidateEntry = async (cacheKey) => {
    try {
      await axios.delete(`/api/cache/entry/${cacheKey}`);
      await fetchCacheData(); // Refresh data
      alert(`Cache entry ${cacheKey} invalidated successfully!`);
    } catch (err) {
      alert("Failed to invalidate cache entry");
      console.error("Invalidate error:", err);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatAge = (timestamp) => {
    const age = Date.now() - timestamp;
    const minutes = Math.floor(age / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  if (loading) return <div className="p-4">Loading cache dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">GenAI Cache Dashboard</h1>
        <p className="text-gray-600">
          Monitor and manage your AI response cache to optimize token usage
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-600 mb-1">
              Total Requests
            </h3>
            <p className="text-2xl font-bold text-blue-900">
              {stats.totalRequests}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-sm font-medium text-green-600 mb-1">
              Cache Hit Rate
            </h3>
            <p className="text-2xl font-bold text-green-900">
              {stats.cacheHitRate}
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="text-sm font-medium text-orange-600 mb-1">
              Tokens Used
            </h3>
            <p className="text-2xl font-bold text-orange-900">
              {stats.totalTokensUsed.toLocaleString()}
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-sm font-medium text-purple-600 mb-1">
              Tokens Saved
            </h3>
            <p className="text-2xl font-bold text-purple-900">
              {stats.totalTokensSaved.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={fetchCacheData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Refresh Data
        </button>
        <button
          onClick={handleCleanup}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Cleanup Old Entries
        </button>
      </div>

      {/* Cache Entries Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium">
            Cache Entries ({entries.length})
          </h3>
        </div>

        {entries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No cache entries found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cache Key
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Files
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Colors
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Libraries
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tokens
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.cacheKey} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">
                      {entry.cacheKey}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {entry.fileCount || 0}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          entry.hasColors ? "bg-green-400" : "bg-gray-300"
                        }`}
                      ></span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          entry.hasLibraries ? "bg-blue-400" : "bg-gray-300"
                        }`}
                      ></span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {entry.tokenCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatAge(entry.timestamp)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleInvalidateEntry(entry.cacheKey)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CacheDashboard;
