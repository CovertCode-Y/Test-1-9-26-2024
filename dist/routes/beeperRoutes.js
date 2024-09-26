"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beepersController_1 = require("../controllers/beepersController");
const router = express_1.default.Router();
router.get("/beepers", beepersController_1.getBeepers);
router.get("/beepers/:id", beepersController_1.getBeeperById);
router.post("/beepers", beepersController_1.createBeeper);
router.put("/beepers/:id", beepersController_1.updateBeeperStatus);
router.delete("/beepers/:id", beepersController_1.deleteBeeper);
router.get("/beepers/status/:status", beepersController_1.getBeeperByStatus);
exports.default = router;
