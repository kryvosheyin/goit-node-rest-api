import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const contacts = await contactsService.listContacts({ owner });
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsService.getContact({ id, owner });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsService.getContact({ id, owner });
  if (!contact) {
    throw HttpError(404);
  }
  await contactsService.removeContact(id);
  res.json(contact);
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const contact = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  validateNotEmptyBody(req.body);
  const contact = await contactsService.updateContact({ id, owner }, req.body);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  validateNotEmptyBody(req.body);
  const contact = await contactsService.updateStatusContact(
    { id, owner },
    req.body
  );
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const validateNotEmptyBody = (body) => {
  if (Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
};
