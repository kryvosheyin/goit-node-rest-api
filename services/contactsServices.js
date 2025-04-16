import Contact from "../db/models/Contact.js";
import HttpError from "../helpers/HttpError.js";

const listContacts = (query) => Contact.findAll({ where: query });

const getContact = async (query) => await Contact.findOne({ where: query });

const addContact = async (contactData) => {
  const { email, owner } = contactData;
  const existingContact = await getContact({ email, owner });
  if (existingContact) {
    throw HttpError(409, "Contact with this email already exists");
  }
  return await Contact.create(contactData);
};

const updateContact = async (query, contactData) => {
  const contact = await getContact(query);
  if (!contact) return null;
  return contact.update(contactData, { returning: true });
};

const updateStatusContact = async (query, body) => {
  const contact = await getContact(query);
  if (!contact) return null;
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
