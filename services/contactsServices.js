import Contact from "../db/models/Contact.js";

export const listContacts = () => Contact.findAll();

export const getContactById = async (contactId) =>
  await Contact.findByPk(contactId);

export const addContact = async (contactData) =>
  await Contact.create(contactData);

export const updateContact = async (contactId, contactData) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  return contact.update(contactData, { returning: true });
};

export const updateStatusContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  return contact.update(body, { returning: true });
};

export const removeContact = async (contactId) => {
  Contact.destroy({
    where: {
      id: contactId,
    },
  });
};
