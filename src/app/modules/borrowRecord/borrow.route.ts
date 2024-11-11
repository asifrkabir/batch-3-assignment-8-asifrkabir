import { Router } from "express";
import { BorrowRecordController } from "./borrowRecord.controller";

const router = Router();

router.post("/", BorrowRecordController.borrowBook);

router.get("/overdue", BorrowRecordController.getOverdueBorrowList);

export const BorrowRoutes = router;
