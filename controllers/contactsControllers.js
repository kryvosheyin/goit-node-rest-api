import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

/**
 * Get the list of all contacts
 * @returns {Array<Object>} An array of contact objects
 */
export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

/**
 * Get a contact by ID
 * @param {Object} req - The request object, containing the contact ID in params
 * @param {Object} res - The response object used to send the result
 * @throws {HttpError} If the contact is not found with the given ID
 * @returns {void} Sends the contact object as a JSON response
 */

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  if (!contact) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(contact);
};

/**
 * Delete a contact by ID
 * @param {Object} req - The request object, containing the contact ID in params
 * @param {Object} res - The response object used to send the result
 * @throws {HttpError} If the contact is not found with the given ID
 * @returns {void} Sends the removed contact object as a JSON response
 */
export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);
  if (!contact) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(contact);
};

/**
 * Add a new contact to the list
 * @param {Object} req - The request object, containing the contact data in body
 * @param {Object} res - The response object used to send the result
 * @returns {void} Sends the newly added contact object as a JSON response with a 201 status
 */
export const createContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  res.status(201).json(contact);
};

/**
 * Update a contact by ID
 * @param {Object} req - The request object, containing the contact ID in params and the contact data in body
 * @param {Object} res - The response object used to send the result
 * @throws {HttpError} If the contact is not found with the given ID
 * @returns {void} Sends the updated contact object as a JSON response
 */
export const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.updateContact(id, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(contact);
};
