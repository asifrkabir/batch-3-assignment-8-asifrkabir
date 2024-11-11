/* eslint-disable @typescript-eslint/no-unused-vars */
import { BorrowRecord } from "@prisma/client";
import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const borrowBook = async (payload: BorrowRecord) => {
  const existingBook = await prisma.book.findUnique({
    where: {
      bookId: payload.bookId,
    },
  });

  if (existingBook === null) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Book ID");
  }

  const existingMember = await prisma.member.findUnique({
    where: {
      memberId: payload.memberId,
    },
  });

  if (existingMember === null) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Member ID");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdBorrowRecord = await transactionClient.borrowRecord.create({
      data: payload,
    });

    await transactionClient.book.update({
      where: {
        bookId: payload.bookId,
      },
      data: {
        availableCopies: existingBook.availableCopies - 1,
      },
    });

    return createdBorrowRecord;
  });

  const { returnDate, ...rest } = result;

  return rest;
};

const returnBook = async (payload: Partial<BorrowRecord>) => {
  const id = payload?.borrowId;

  const existingBorrowRecord = await prisma.borrowRecord.findUnique({
    where: {
      borrowId: id,
    },
    include: {
      Book: true,
    },
  });

  if (existingBorrowRecord === null) {
    throw new AppError(httpStatus.NOT_FOUND, "Borrow record not found");
  }

  if (existingBorrowRecord.returnDate) {
    throw new AppError(httpStatus.BAD_REQUEST, "The book was already returned");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const updatedBorrowRecord = await transactionClient.borrowRecord.update({
      where: {
        borrowId: id,
      },
      data: {
        returnDate: new Date(),
      },
    });

    const existingBook = existingBorrowRecord.Book;

    await transactionClient.book.update({
      where: {
        bookId: updatedBorrowRecord.bookId,
      },
      data: {
        availableCopies: existingBook.availableCopies + 1,
      },
    });

    return updatedBorrowRecord;
  });

  return result;
};

const getOverdueBorrowList = async () => {
  const today = new Date();

  const lastAllowedDate = new Date();
  lastAllowedDate.setDate(today.getDate() - 14);

  const overdueRecords = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lt: lastAllowedDate,
      },
    },
    include: {
      Book: {
        select: {
          title: true,
        },
      },
      Member: {
        select: {
          name: true,
        },
      },
    },
  });

  const result = overdueRecords.map((borrowRecord) => {
    const overdueDays =
      Math.floor(
        (today.getTime() - borrowRecord.borrowDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) - 14;

    return {
      borrowId: borrowRecord.borrowId,
      bookTitle: borrowRecord.Book.title,
      borrowerName: borrowRecord.Member.name,
      overdueDays,
    };
  });

  return result;
};

export const BorrowRecordService = {
  borrowBook,
  returnBook,
  getOverdueBorrowList,
};
