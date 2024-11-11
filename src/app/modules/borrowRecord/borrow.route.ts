import { Router } from "express";
import { BorrowRecordController } from "./borrowRecord.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BorrowRecordValidations } from "./borrowRecord.validation";

const router = Router();

router.post(
  "/",
  validateRequest(BorrowRecordValidations.borrowValidationSchema),
  BorrowRecordController.borrowBook
);

router.get("/overdue", BorrowRecordController.getOverdueBorrowList);

export const BorrowRoutes = router;
