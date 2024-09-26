"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeeperByStatus = exports.deleteBeeper = exports.updateBeeperStatus = exports.createBeeper = exports.getBeeperById = exports.getBeepers = void 0;
const beeperService = __importStar(require("../service/beepersService"));
const getBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield beeperService.getAllBeepers();
        res.json(beepers);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching beepers" });
    }
});
exports.getBeepers = getBeepers;
const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const beeper = yield beeperService.getBeeperById(id);
        if (beeper) {
            res.json(beeper);
        }
        else {
            res.status(404).json({ message: "Beeper not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching beeper" });
    }
});
exports.getBeeperById = getBeeperById;
const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBeeper = {
            id: "",
            name: req.body.name,
            status: "manufactured",
            created_at: new Date(),
            longitude: -1,
            latitude: -1,
            exploded_at: -1,
        };
        const createdBeeper = yield beeperService.createBeeper(newBeeper);
        res.status(201).json(createdBeeper);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating beeper" });
    }
});
exports.createBeeper = createBeeper;
const updateBeeperStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status, longitude, latitude } = req.body;
    try {
        const beeper = yield beeperService.getBeeperById(id);
        if (!beeper) {
            return res.status(404).json({ message: "Beeper not found" });
        }
        if (status === "deployed") {
            if (longitude && latitude) {
                beeper.longitude = longitude;
                beeper.latitude = latitude;
            }
            else {
                return res.status(400).json({
                    message: "Longitude and latitude are required for deployed status",
                });
            }
        }
        beeper.status = status;
        const updatedBeeper = yield beeperService.updateBeeper(id, beeper);
        res.json(updatedBeeper);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating beeper status" });
    }
});
exports.updateBeeperStatus = updateBeeperStatus;
const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const success = yield beeperService.deleteBeeper(id);
        if (success) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Beeper not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting beeper" });
    }
});
exports.deleteBeeper = deleteBeeper;
const getBeeperByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.params;
    try {
        const beepers = yield beeperService.getBeeperByStatus(status);
        res.json(beepers);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching beepers" });
    }
});
exports.getBeeperByStatus = getBeeperByStatus;
