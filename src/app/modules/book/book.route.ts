import { Router } from "express";
import { BookController } from "./book.controller";

const router = Router();

router.post("/", BookController.createBook);

router.get("/", BookController.getAllBooks);

router.get("/:id", BookController.getBookById);

router.patch("/:id", BookController.updateBook);

export const BookRoutes = router;
