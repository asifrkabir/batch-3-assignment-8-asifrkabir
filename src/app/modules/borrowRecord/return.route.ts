import { Router } from "express";
import { BorrowRecordController } from "./borrowRecord.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BorrowRecordValidations } from "./borrowRecord.validation";

const router = Router();

router.post(
  "/",
  validateRequest(BorrowRecordValidations.returnValidationSchema),
  BorrowRecordController.returnBook
);

export const ReturnRoutes = router;
