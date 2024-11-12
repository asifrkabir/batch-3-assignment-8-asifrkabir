import { Member } from "@prisma/client";
import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createMember = async (payload: Member) => {
  const existingEmailCount = await prisma.member.count({
    where: {
      email: payload.email,
    },
  });

  if (existingEmailCount > 0) {
    throw new AppError(httpStatus.CONFLICT, "This email already exists");
  }

  const result = await prisma.member.create({
    data: payload,
  });

  return result;
};

const getAllMembers = async () => {
  const result = await prisma.member.findMany();

  return result;
};

const getMemberById = async (id: string) => {
  const result = await prisma.member.findUnique({
    where: {
      memberId: id,
    },
  });

  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  }

  return result;
};

const updateMember = async (id: string, payload: Partial<Member>) => {
  const existingMember = await prisma.member.findUnique({
    where: {
      memberId: id,
    },
  });

  if (existingMember === null) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Member ID");
  }

  if (payload?.email) {
    const existingEmailCount = await prisma.member.count({
      where: {
        email: payload.email,
      },
    });

    if (existingEmailCount > 0) {
      throw new AppError(httpStatus.CONFLICT, "This email already exists");
    }
  }

  payload.memberId = id;

  const result = await prisma.member.update({
    where: {
      memberId: id,
    },
    data: payload,
    select: {
      memberId: true,
      name: true,
      email: true,
      phone: true,
    },
  });

  return result;
};

const deleteMember = async (id: string) => {
  const existingMember = await prisma.member.findUnique({
    where: {
      memberId: id,
    },
  });

  if (existingMember === null) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Member ID");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.borrowRecord.deleteMany({
      where: {
        memberId: id,
      },
    });

    const deletedMember = await transactionClient.member.delete({
      where: {
        memberId: id,
      },
    });

    return deletedMember;
  });

  return result;
};

export const MemberService = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
