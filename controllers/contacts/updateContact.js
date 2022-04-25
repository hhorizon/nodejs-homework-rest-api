const Contact = require("../../models/contact");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    {
      ...body,
    },
    { new: true }
  );

  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }

  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
};

module.exports = updateContact;
