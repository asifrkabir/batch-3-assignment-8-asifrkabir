import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookService } from "./book.service";

const createBook = catchAsync(async (req, res) => {
  const result = await BookService.createBook(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookService.getAllBooks();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books retrieved successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
};
