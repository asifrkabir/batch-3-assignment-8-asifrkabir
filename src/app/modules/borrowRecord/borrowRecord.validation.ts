import { z } from "zod";

const borrowValidationSchema = z.object({
  body: z.object({
    bookId: z
      .string({
        required_error: "Book is required",
        invalid_type_error: "Book must be a valid string",
      })
      .min(1, { message: "Book is required" }),
    memberId: z
      .string({
        required_error: "Member is required",
        invalid_type_error: "Member must be a valid string",
      })
      .min(1, { message: "Member is required" }),
  }),
});

const returnValidationSchema = z.object({
  body: z.object({
    borrowId: z
      .string({
        required_error: "Borrow Record ID is required",
        invalid_type_error: "Borrow Record ID must be a valid string",
      })
      .min(1, { message: "Borrow Record ID is required" }),
  }),
});

export const BorrowRecordValidations = {
  borrowValidationSchema,
  returnValidationSchema,
};
