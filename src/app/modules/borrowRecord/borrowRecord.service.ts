/* eslint-disable @typescript-eslint/no-unused-vars */
import { BorrowRecord } from "@prisma/client";
import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const borrowBook = async (payload: BorrowRecord) => {
  const result = await prisma.borrowRecord.create({
    data: payload,
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
  });

  if (existingBorrowRecord === null) {
    throw new AppError(httpStatus.NOT_FOUND, "Borrow record not found");
  }

  const result = await prisma.borrowRecord.update({
    where: {
      borrowId: id,
    },
    data: {
      returnDate: new Date(),
    },
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
        lt: lastAllowedDate, // Borrow date is less than last allowed date to return
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
