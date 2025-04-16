import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import errorHandler from "../decorators/errorHandler.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", errorHandler(getAllContacts));

contactsRouter.get("/:id", errorHandler(getOneContact));

contactsRouter.delete("/:id", errorHandler(deleteContact));

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  errorHandler(createContact)
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  errorHandler(updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateContactSchema),
  errorHandler(updateStatusContact)
);

export default contactsRouter;
