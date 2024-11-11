import { z } from "zod";

const createMemberValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a valid string",
      })
      .min(1, { message: "Name is required" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a valid string",
      })
      .email({ message: "Invalid email format" })
      .min(1, { message: "Email is required" }),
    phone: z
      .string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone must be a valid string",
      })
      .min(1, { message: "Phone is required" }),
    membershipDate: z
      .string({
        required_error: "Membership Date is required",
        invalid_type_error: "Membership Date must be a valid date",
      })
      .datetime({ message: "Membership Date must be a valid date" }),
  }),
});

const updateMemberValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a valid string",
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: "Email must be a valid string",
      })
      .email({ message: "Invalid email format" })
      .optional(),
    phone: z
      .string({
        invalid_type_error: "Phone must be a valid string",
      })
      .optional(),
    membershipDate: z
      .string({
        invalid_type_error: "Membership Date must be a valid string",
      })
      .datetime({ message: "Membership Date must be a valid date" })
      .optional(),
  }),
});

export const MemberValidations = {
  createMemberValidationSchema,
  updateMemberValidationSchema,
};
