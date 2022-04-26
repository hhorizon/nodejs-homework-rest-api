const express = require("express");
const contactsControllers = require("../../../controllers/contacts");
const {
  contactSchema,
} = require("../../../schemas/contact-validation-schemes");
const { validateBody } = require("../../../middlewares/validation");
const { wrapper: wrapperError } = require("../../../middlewares/error-handler");
const guard = require("../../../middlewares/guard");

const router = express.Router();

router.get("/", guard, wrapperError(contactsControllers.getAllContacts));

router.get(
  "/:contactId",
  guard,
  wrapperError(contactsControllers.getContactById)
);

router.post(
  "/",
  guard,
  validateBody(contactSchema),
  wrapperError(contactsControllers.addContact)
);

router.delete(
  "/:contactId",
  guard,
  wrapperError(contactsControllers.removeContact)
);

router.put(
  "/:contactId",
  guard,
  validateBody(contactSchema),
  wrapperError(contactsControllers.updateContact)
);

router.patch(
  "/:contactId/favorite",
  guard,
  wrapperError(contactsControllers.updateStatusContact)
);

module.exports = router;