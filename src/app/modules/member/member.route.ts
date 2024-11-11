import { Router } from "express";
import { MemberController } from "./member.controller";

const router = Router();

router.post("/", MemberController.createMember);

router.get("/", MemberController.getAllMembers);

router.get("/:id", MemberController.getMemberById);

router.patch("/:id", MemberController.updateMember);

export const MemberRoutes = router;
