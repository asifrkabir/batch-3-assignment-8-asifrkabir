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

  if (result.length <= 0) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "No data found",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Members retrieved successfully",
      data: result,
    });
  }
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

const updateMember = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await MemberService.updateMember(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember = catchAsync(async (req, res) => {
  const { id } = req.params;

  await MemberService.deleteMember(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Member successfully deleted",
    data: undefined,
  });
});

export const MemberController = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
