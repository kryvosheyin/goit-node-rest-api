import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const filter = { owner };

  if (req.query.favorite !== undefined) {
    filter.favorite = req.query.favorite === "true";
  }

  const { rows: contacts, count: total } = await contactsService.listContacts(
    filter,
    { offset, limit }
  );
  res.json({ total, page, limit, contacts });
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsService.getContact({ id, owner });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsService.getContact({ id, owner });
  if (!contact) {
    throw HttpError(404);
  }
  await contactsService.removeContact(id);
  res.json(contact);
};

const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const contact = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  validateNotEmptyBody(req.body);
  const contact = await contactsService.updateContact({ id, owner }, req.body);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const updateStatusContact = async (req, res) => {
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

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
