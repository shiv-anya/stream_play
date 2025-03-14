const { connect } = require("getstream");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

const signup = async (req, res) => {
  try {
    const { fullName, email, password, username } = req.body;
    const userId = crypto.randomBytes(16).toString("hex");
    const serverClient = connect(api_key, api_secret, api_id);
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userId);
    res
      .status(200)
      .json({ token, fullName, email, userId, hashedPassword, username });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const serverClient = connect(api_key, api_secret, api_id);
    const client = StreamChat.getInstance(api_key, api_secret, {
      timeout: 6000,
    });
    const { users } = await client.queryUsers({ name: username });
    if (!users.length) res.status(400).json({ message: "User not found." });
    const success = await bcrypt.compare(password, users[0].hashedPassword);
    const token = serverClient.createUserToken(users[0].id);
    if (success) {
      res
        .status(200)
        .json({ fullName: users[0].fullName, userId: users[0].id, token });
    } else {
      res.status(500).json({ message: "Incorrect Password." });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error" });
  }
};

module.exports = { login, signup };
