import express from "express";
import {
  createBeeper,
  getBeepers,
  updateBeeperStatus,
  deleteBeeper,
  getBeeperById,
  getBeeperByStatus
} from "../controllers/beepersController";

const router = express.Router();

router.get("/beepers", getBeepers);
router.get("/beepers/:id", getBeeperById);
router.post("/beepers", createBeeper);
router.put("/beepers/:id", updateBeeperStatus);
router.delete("/beepers/:id", deleteBeeper);
router.get("/beepers/status/:status", getBeeperByStatus);

export default router;