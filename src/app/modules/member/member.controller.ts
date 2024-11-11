import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MemberService } from "./member.service";

const createMember = catchAsync(async (req, res) => {
  const result = await MemberService.createMember(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Member created successfully",
    data: result,
  });
});

const getAllMembers = catchAsync(async (req, res) => {
  const result = await MemberService.getAllMembers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getMemberById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await MemberService.getMemberById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Member retrieved successfully",
    data: result,
  });
});

export const MemberController = {
  createMember,
  getAllMembers,
  getMemberById,
};
