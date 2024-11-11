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

export const BorrowRecordService = {
  borrowBook,
  returnBook,
};
