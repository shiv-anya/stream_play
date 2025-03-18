const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  checkEmailExists,
  checkUserExists,
} = require("../controllers/auth");

router.get("/check-username/:username", checkUserExists);
router.get("/check-email/:email", checkEmailExists);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
