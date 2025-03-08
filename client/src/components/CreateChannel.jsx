import { useState, useEffect, useContext } from "react";
import { useChatContext } from "stream-chat-react";
import { v4 as uuidv4 } from "uuid";
import ThemeContext from "../ctx/ThemeContext";

const CreateChannel = ({ onClose }) => {
  const { client } = useChatContext();
  const [channelName, setChannelName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { darkTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.queryUsers({});
        const filteredUsers = response.users.filter(
          (user) => user.id !== client.userId
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [client]);

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    if (!channelName || selectedUsers.length === 0) return;
    const sanitizedChannelName = channelName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .trim();

    const uniqueId = uuidv4().split("-")[0];
    const channelId = `${sanitizedChannelName}-${uniqueId}`;
    try {
      const channel = client.channel("team", channelId, {
        name: channelName,
        members: [client.userID, ...selectedUsers],
        image: avatarURL || undefined,
      });
      await channel.create();
      onClose();
    } catch (error) {
      console.log("Error creating channel:", error);
    }
  };

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-red-900 bg-opacity-50">
    <div
      className={`${
        darkTheme ? "bg-[#23272a] text-gray-300" : "bg-white"
      } p-6 rounded-lg shadow-lg w-96`}
    >
      <h2 className="text-lg font-semibold mb-4">Create a New Channel</h2>
      <form onSubmit={handleCreateChannel} className="space-y-4">
        {/* Channel Name Input */}
        <input
          type="text"
          placeholder="Channel Name"
          className={`w-full p-2 border rounded-md text-black ${
            darkTheme && "bg-gray-700"
          } outline-none focus:ring focus:ring-indigo-200`}
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Avatar URL (Optional)"
          value={avatarURL}
          onChange={(e) => setAvatarURL(e.target.value)}
          className={`w-full p-2 mb-3 border rounded-lg focus:ring focus:ring-indigo-200 text-black ${
            darkTheme && "bg-gray-700"
          } outline-none`}
        />
        {/* User Selection Dropdown */}
        <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
          {users.map((user) => (
            <label key={user.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={user.id}
                onChange={() => handleUserSelect(user.id)}
                checked={selectedUsers.includes(user.id)}
              />
              <span>{user.name || user.id}</span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
        >
          Create Channel
        </button>

        {/* Close Button */}
        <button onClick={onClose} className={`w-full text-gray-500 mt-2`}>
          Cancel
        </button>
      </form>
    </div>
    // </div>
  );
};

export default CreateChannel;
