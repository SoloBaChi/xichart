const { Router } = require("express");
const { myProfile, updateProfile } = require("../controllers/user.controller");
myProfile

const router = Router();

// get the user
router.get('/get-profile',myProfile)

// update the uset
router.put("/update-profile",updateProfile)

module.exports = router;