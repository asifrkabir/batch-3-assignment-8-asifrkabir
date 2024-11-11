import { Member } from "@prisma/client";
import prisma from "../../config/prisma";

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

export const MemberService = {
  createMember,
  getAllMembers,
};
