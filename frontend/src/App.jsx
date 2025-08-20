import { useEffect, useState } from "react";
import api from "./api";
import HistoryList from "./components/HistoryList";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState("");

  // Fetch leaderboard
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add a new user
  const addUser = async () => {
    if (!newUserName) {
      setMessage("⚠️ Please enter a name");
      return;
    }
    try {
      const res = await api.post("/users", { name: newUserName });
      console.log("✅ User added:", res.data);
      setMessage(`User ${res.data.name} added!`);
      setNewUserName("");
      fetchUsers();
    } catch (err) {
      console.error("❌ Error adding user:", err.response?.data || err.message);
      setMessage("Failed to add user");
    }
  };

  // Claim points
  const claimPoints = async () => {
    if (!selectedUser) return;
    const res = await api.post(`/users/claim/${selectedUser}`);
    setMessage(res.data.message);
    fetchUsers();
  };

  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard</h1>

      <div className="sm:w-[500px]">
        {/* Select User */}
        <div className="mb-4 flex gap-2 justify-center">
          <select
            className="p-2  rounded border w-[182px] text-center"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

          <button
            onClick={claimPoints}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Claim Points
          </button>
        </div>

        {/* Add User */}
        <div className="mb-4 flex gap-2 justify-center">
          <input
            type="text"
            placeholder="New user name"
            className="p-2 border rounded"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <button
            onClick={addUser}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Message */}
      {message && <p className="mb-4 text-blue-600 font-semibold">{message}</p>}

      {/* Leaderboard */}
      <table className="bg-white shadow-md rounded-lg sm:w-[500px]">
        <thead className="w-full">
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Points</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {users.map((user) => {
            let rowStyle = "";
            if (user.rank === 1)
              rowStyle = "bg-yellow-100 font-bold"; // 🥇 Gold
            else if (user.rank === 2)
              rowStyle = "bg-gray-200 font-semibold"; // 🥈 Silver
            else if (user.rank === 3) rowStyle = "bg-orange-100 font-medium"; // 🥉 Bronze

            return (
              <tr key={user._id} className={`border-b ${rowStyle}`}>
                <td className="p-2">
                  {user.rank === 1 && "🥇"}
                  {user.rank === 2 && "🥈"}
                  {user.rank === 3 && "🥉"}
                  {user.rank > 3 && user.rank}
                </td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.totalPoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <HistoryList userId={selectedUser} />
    </div>
  );
}

export default App;
