import { useEffect, useState } from "react";
import api from "../api";

function HistoryList({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;
      try {
        const res = await api.get(`/users/history/${userId}`);
        setHistory(res.data);
      } catch (err) {
        console.error(
          "❌ Error fetching history:",
          err.response?.data || err.message
        );
      }
    };
    fetchHistory();
  }, [userId]);

  if (!userId)
    return <p className="text-gray-500">Select a user to see history.</p>;

  return (
    <div className="mt-6 w-full max-w-md bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-2">📜 Claim History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No history available</p>
      ) : (
        <ul className="divide-y">
          {history.map((entry, index) => (
            <li key={entry._id || index} className="py-2 flex justify-between">
              <span>+{entry.points} points</span>
              <span className="text-sm text-gray-500">
                {new Date(entry.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryList;
