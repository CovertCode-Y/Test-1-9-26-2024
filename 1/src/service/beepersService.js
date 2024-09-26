"use strict";
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
exports.getBeeperByStatus = exports.deleteBeeper = exports.updateBeeper = exports.createBeeper = exports.getBeeperById = exports.getAllBeepers = exports.writeBeepers = exports.readBeepers = void 0;
const jsonfile = require("jsonfile");
const DB_FILE = "./beepersData.json";
const readBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield jsonfile.readFile(DB_FILE);
        return db.beepers || [];
    }
    catch (error) {
        console.error("Error reading beepers:", error);
        return [];
    }
});
exports.readBeepers = readBeepers;
const writeBeepers = (beepers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = { beepers };
        yield jsonfile.writeFile(DB_FILE, db, { spaces: 2 });
    }
    catch (error) {
        console.error("Error writing beepers:", error);
        throw new Error("Write failed");
    }
});
exports.writeBeepers = writeBeepers;
const getAllBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exports.readBeepers)();
});
exports.getAllBeepers = getAllBeepers;
const getBeeperById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield (0, exports.readBeepers)();
    return beepers.find((beeper) => beeper.id === id);
});
exports.getBeeperById = getBeeperById;
const createBeeper = (newBeeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield (0, exports.readBeepers)();
    const Id = Math.max(...beepers.map((b) => Number(b.id)), 0);
    newBeeper.id = (Id + 1).toString();
    newBeeper.createdAt = new Date();
    beepers.push(newBeeper);
    yield (0, exports.writeBeepers)(beepers);
    return newBeeper;
});
exports.createBeeper = createBeeper;
const updateBeeper = (id, updatedBeeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield (0, exports.readBeepers)();
    const index = beepers.findIndex((beeper) => beeper.id === id);
    if (index === -1)
        return null;
    beepers[index] = Object.assign(Object.assign(Object.assign({}, beepers[index]), updatedBeeper), { id });
    yield (0, exports.writeBeepers)(beepers);
    return beepers[index];
});
exports.updateBeeper = updateBeeper;
const deleteBeeper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield (0, exports.readBeepers)();
    const initialLength = beepers.length;
    const updatedBeepers = beepers.filter((beeper) => beeper.id !== id);
    if (updatedBeepers.length === initialLength)
        return false;
    yield (0, exports.writeBeepers)(updatedBeepers);
    return true;
});
exports.deleteBeeper = deleteBeeper;
const getBeeperByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield (0, exports.readBeepers)();
    return beepers.filter((beeper) => beeper.status === status);
});
exports.getBeeperByStatus = getBeeperByStatus;
