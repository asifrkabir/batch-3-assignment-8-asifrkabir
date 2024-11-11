import { Book } from "@prisma/client";
import prisma from "../../config/prisma";

const createBook = async (payload: Book) => {
  const result = await prisma.book.create({
    data: payload,
  });

  return result;
};

export const BookService = {
  createBook,
};
