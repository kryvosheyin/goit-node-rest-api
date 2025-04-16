import Contact from "../db/models/Contact.js";

export const listContacts = (query) => Contact.findAll({ where: query });

export const getContactById = async (query) =>
  await Contact.findOne({ where: query });

export const addContact = async (contactData) =>
  await Contact.create(contactData);

export const updateContact = async (query, contactData) => {
  const contact = await getContactById(query);
  if (!contact) return null;
  return contact.update(contactData, { returning: true });
};

export const updateStatusContact = async (query, body) => {
  const contact = await getContactById(query);
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
