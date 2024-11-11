import { Router } from "express";
import { BookRoutes } from "../modules/book/book.route";
import { MemberRoutes } from "../modules/member/member.route";
import { BorrowRoutes } from "../modules/borrowRecord/borrow.route";
import { ReturnRoutes } from "../modules/borrowRecord/return.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/members",
    route: MemberRoutes,
  },
  {
    path: "/borrow",
    route: BorrowRoutes,
  },
  {
    path: "/return",
    route: ReturnRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
