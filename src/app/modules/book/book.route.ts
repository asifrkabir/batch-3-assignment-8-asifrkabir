import { Router } from "express";
import { BookController } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidations } from "./book.validation";

const router = Router();

router.post(
  "/",
  validateRequest(BookValidations.createBookValidationSchema),
  BookController.createBook
);

router.get("/", BookController.getAllBooks);

router.get("/:id", BookController.getBookById);

router.put(
  "/:id",
  validateRequest(BookValidations.updateBookValidationSchema),
  BookController.updateBook
);

router.delete("/:id", BookController.deleteBook);

export const BookRoutes = router;
