import { Router } from 'express';
const router = Router();
import HairdresserController from "../controllers/HairdresserController";

router.delete("/:id", HairdresserController.destroy);
router.get("/list", HairdresserController.list);
router.post("/", HairdresserController.create);
router.put("/:id",  HairdresserController.update);

export default router;
