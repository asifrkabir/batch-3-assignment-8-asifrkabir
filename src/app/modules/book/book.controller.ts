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

  if (result.length <= 0) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "No data found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Books retrieved successfully",
      data: result,
    });
  }
});

const getBookById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BookService.getBookById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BookService.updateBook(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;

  await BookService.deleteBook(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book successfully deleted",
    data: undefined,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
