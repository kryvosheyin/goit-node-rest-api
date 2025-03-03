import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

/**
 * Write the given array of contacts to the contacts database file.
 * @param {Array<Object>} contacts - An array of contact objects
 * @returns {Promise<void>}
 */
const updateContacts = async (contacts) => {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

/**
 * Get the list of all contacts
 * @returns {Array<Object>} An array of contact objects
 */
export async function listContacts() {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
}

/**
 * Get a contact by id
 * @param {string} contactId - The ID of the contact to find
 * @returns {Object|null} The contact object if found, or null if not found
 */
export async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

/**
 * Add a new contact to the list
 * @param {Object} contactData - The contact data to add (name, email, phone)
 * @returns {Object} The newly added contact object, including a generated ID
 */

export async function addContact(contactData) {
  const contacts = await listContacts();
  const newContact = { ...contactData, id: nanoid() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

/**
 * Update an existing contact
 * @param {string} contactId - The ID of the contact to update
 * @param {Object} contactData - The updated contact data
 * @returns {Object|null} The updated contact object if found, or null if not found
 */
export async function updateContact(contactId, contactData) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...contactData };
  await updateContacts(contacts);
  return contacts[index];
}

/**
 * Remove a contact by id
 * @param {string} contactId - The ID of the contact to remove
 * @returns {Object|null} The removed contact object if found, or null if not found
 */
export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [removedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return removedContact;
}
