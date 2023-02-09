const {
  createUser,
  activateCreatedUser,
  userSignInController,
  verifyToken,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");
const { validationHandler } = require("../middleware");
const { signUpValidator, signInValidator } = require("../middleware/userAuth");

const router = require("express").Router();

router.post("/signup", signUpValidator, validationHandler, createUser);
router.post("/email-activate", activateCreatedUser);
router.post(
  "/signin",
  signInValidator,
  validationHandler,
  userSignInController
);
router.get("/user", verifyToken, getUser);
// router.get("/:id", getOneUser);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

module.exports = router;
