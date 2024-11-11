import { Router } from "express";
import { BorrowRecordController } from "./borrowRecord.controller";

const router = Router();

router.post("/", BorrowRecordController.returnBook);

export const ReturnRoutes = router;
