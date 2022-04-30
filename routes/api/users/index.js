const express = require("express");

const usersControllers = require("../../../controllers/users");
const {
  subscriprionSchema,
} = require("../../../schemas/user-validation-schemes");
const { validateBody } = require("../../../middlewares/validation");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");
const guard = require("../../../middlewares/guard");
const upload = require("../../../middlewares/upload");

const router = express.Router();

router.patch(
  "/avatars",
  guard,
  upload.single("avatar"),
  wrapperError(usersControllers.updateAvatar)
);

router.patch(
  "/",
  guard,
  validateBody(subscriprionSchema),
  wrapperError(usersControllers.updateSubscription)
);

module.exports = router;
