import { Router } from "express";
import { MemberController } from "./member.controller";

const router = Router();

router.post("/", MemberController.createMember);

router.get("/", MemberController.getAllMembers);

router.get("/:id", MemberController.getMemberById);

export const MemberRoutes = router;
