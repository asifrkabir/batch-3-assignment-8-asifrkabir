/* eslint-disable @typescript-eslint/no-unused-vars */
import { BorrowRecord } from "@prisma/client";
import prisma from "../../config/prisma";

const borrowBook = async (payload: BorrowRecord) => {
  const result = await prisma.borrowRecord.create({
    data: payload,
  });

  const { returnDate, ...rest } = result;

  return rest;
};

export const BorrowRecordService = {
  borrowBook,
};
