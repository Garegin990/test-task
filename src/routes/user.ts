import { Router } from 'express';
const router = Router();
import UserController from "../controllers/UserController";

router.delete("/:id", UserController.destroy);
router.get("/", UserController.list);
router.post("/sign-up", UserController.signUp);
router.post("/sign-in", UserController.signIn);

export default router;
