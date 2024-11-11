import { Router } from "express";
import { MemberController } from "./member.controller";
import validateRequest from "../../middlewares/validateRequest";
import { MemberValidations } from "./member.validation";

const router = Router();

router.post(
  "/",
  validateRequest(MemberValidations.createMemberValidationSchema),
  MemberController.createMember
);

router.get("/", MemberController.getAllMembers);

router.get("/:id", MemberController.getMemberById);

router.patch(
  "/:id",
  validateRequest(MemberValidations.updateMemberValidationSchema),
  MemberController.updateMember
);

router.delete("/:id", MemberController.deleteMember);

export const MemberRoutes = router;
