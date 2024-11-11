import { Member } from "@prisma/client";
import prisma from "../../config/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createMember = async (payload: Member) => {
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
    throw new AppError(httpStatus.NOT_FOUND, "Member not found");
  }

  const result = await prisma.member.update({
    where: {
      memberId: id,
    },
    data: payload,
  });

  return result;
};

export const MemberService = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
};
