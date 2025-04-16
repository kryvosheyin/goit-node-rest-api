import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import errorHandler from "../decorators/errorHandler.js";
import authenticate from "../middlewares/authenticate.js";
import contactsControllers from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", errorHandler(contactsController.getAllContacts));

contactsRouter.get("/:id", errorHandler(contactsController.getOneContact));

contactsRouter.delete("/:id", errorHandler(contactsController.deleteContact));

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  errorHandler(contactsController.createContact)
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  errorHandler(contactsController.updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateContactSchema),
  errorHandler(contactsController.updateStatusContact)
);

export default contactsRouter;
