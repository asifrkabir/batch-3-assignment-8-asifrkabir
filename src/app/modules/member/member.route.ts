import { Router } from "express";
import { MemberController } from "./member.controller";

const router = Router();

router.post("/", MemberController.createMember);

export const MemberRoutes = router;
