import Contact from "../db/models/Contact.js";
import HttpError from "../helpers/HttpError.js";

const listContacts = async (query, options = {}) => {
  const { offset = 0, limit = 20 } = options;
  return await Contact.findAndCountAll({ where: query, offset, limit });
};

const getContact = async (query) => {
  return await Contact.findOne({ where: query });
};

const addContact = async (contactData) => {
  const { email, owner } = contactData;

  // Check if the contact already exists
  const existingContact = await getContact({ email, owner });
  if (existingContact) {
    throw HttpError(409, "Contact with this email already exists");
  }

  // Create and return the new contact
  return await Contact.create(contactData);
};

const updateContact = async (query, contactData) => {
  const contact = await getContact(query);
  if (!contact) return null;

  // Update and return updated contact
  return contact.update(contactData, { returning: true });
};

const updateStatusContact = async (query, body) => {
  const contact = await getContact(query);
  if (!contact) return null;

  // Update and return updated contact
  return contact.update(body, { returning: true });
};

const removeContact = async (contactId) => {
  Contact.destroy({
    where: {
      id: contactId,
    },
  });
};

export default {
  listContacts,
  getContact,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
