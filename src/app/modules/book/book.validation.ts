import { z } from "zod";

const createBookValidationSchema = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: "Title is required",
          invalid_type_error: "Title must be a valid string",
        })
        .min(1, { message: "Title is required" }),
      genre: z
        .string({
          required_error: "Genre is required",
          invalid_type_error: "Genre must be a valid string",
        })
        .min(1, { message: "Genre is required" }),
      publishedYear: z
        .number({
          required_error: "Published Year is required",
          invalid_type_error: "Published Year must be a valid number",
        })
        .min(1, { message: "Published Year must be at least 1" }),
      totalCopies: z
        .number({
          required_error: "Total Copies is required",
          invalid_type_error: "Total Copies must be a valid number",
        })
        .min(1, { message: "Total Copies must be at least 0" }),
      availableCopies: z
        .number({
          required_error: "Available Copies is required",
          invalid_type_error: "Available Copies must be a valid number",
        })
        .min(1, { message: "Available Copies must be at least 0" }),
    })
    .refine((data) => data.availableCopies <= data.totalCopies, {
      message: "Available Copies cannot be greater than Total Copies",
      path: ["availableCopies"],
    }),
});

export const BookValidations = {
  createBookValidationSchema,
};
