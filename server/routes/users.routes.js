const {
  createUser,
  activateCreatedUser,
  userSignInController,
  verifyToken,
  getUser,
  refreshToken,
  logout,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");
const { validationHandler } = require("../middleware");
const { signUpValidator, signInValidator } = require("../middleware/userAuth");

const router = require("express").Router();

router.post("/signup", signUpValidator, validationHandler, createUser);
router.get("/email-activate", activateCreatedUser);
router.post(
  "/signin",
  signInValidator,
  validationHandler,
  userSignInController
);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
// router.get("/:id", getOneUser);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

module.exports = router;
