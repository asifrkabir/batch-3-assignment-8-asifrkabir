import { Book } from "@prisma/client";
import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createBook = async (payload: Book) => {
  const result = await prisma.book.create({
    data: payload,
  });

  return result;
};

const getAllBooks = async () => {
  const result = await prisma.book.findMany();

  return result;
};

const getBookById = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      bookId: id,
    },
  });

  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found");
  }

  return result;
};

const updateBook = async (id: string, payload: Partial<Book>) => {
  const existingBook = await prisma.book.findUnique({
    where: {
      bookId: id,
    },
  });

  if (existingBook === null) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Book ID");
  }

  // const updatedBookData = {
  //   ...existingBook,
  //   ...payload,
  // };

  // if (updatedBookData.availableCopies > updatedBookData.totalCopies) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "Available Copies cannot be greater than Total Copies"
  //   );
  // }

  payload.bookId = id;

  const result = await prisma.book.update({
    where: {
      bookId: id,
    },
    data: payload,
  });

  return result;
};

const deleteBook = async (id: string) => {
  const existingBook = await prisma.book.findUnique({
    where: {
      bookId: id,
    },
  });

  if (existingBook === null) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Book ID");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.borrowRecord.deleteMany({
      where: {
        bookId: id,
      },
    });

    const deletedBook = await transactionClient.book.delete({
      where: {
        bookId: id,
      },
    });

    return deletedBook;
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
