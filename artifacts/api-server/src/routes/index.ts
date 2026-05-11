import { Router, type IRouter } from "express";
import healthRouter from "./health";
import joinRouter from "./join";

const router: IRouter = Router();

router.use(healthRouter);
router.use(joinRouter);

export default router;
