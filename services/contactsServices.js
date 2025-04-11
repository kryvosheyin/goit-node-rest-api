import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = async (contacts) => {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export async function listContacts() {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

export async function addContact(contactData) {
  const contacts = await listContacts();
  const newContact = { ...contactData, id: nanoid() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

export async function updateContact(contactId, contactData) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...contactData };
  await updateContacts(contacts);
  return contacts[index];
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [removedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return removedContact;
}
