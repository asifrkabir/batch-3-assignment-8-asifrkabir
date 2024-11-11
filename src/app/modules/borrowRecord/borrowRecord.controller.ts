import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BorrowRecordService } from "./borrowRecord.service";

const borrowBook = catchAsync(async (req, res) => {
  const result = await BorrowRecordService.borrowBook(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book borrowed successfully",
    data: result,
  });
});

const returnBook = catchAsync(async (req, res) => {
  await BorrowRecordService.returnBook(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book returned successfully",
    data: undefined,
  });
});

export const BorrowRecordController = {
  borrowBook,
  returnBook,
};
