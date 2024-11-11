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

const getOverdueBorrowList = catchAsync(async (req, res) => {
  const result = await BorrowRecordService.getOverdueBorrowList();

  if (result.length <= 0) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "No overdue books",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Overdue borrow list fetched",
      data: result,
    });
  }
});

export const BorrowRecordController = {
  borrowBook,
  returnBook,
  getOverdueBorrowList,
};
