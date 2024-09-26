"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBeeper = exports.updateBeeperStatus = exports.getBeepers = exports.createBeeper = void 0;
const uuid_1 = require("uuid");
let beepers = [];
const createBeeper = (req, res) => {
    const newBeeper = {
        id: (0, uuid_1.v4)(),
        name: req.body.name,
        status: "manufactured",
        createdAt: new Date(),
    };
    beepers.push(newBeeper);
    res.status(201).json(newBeeper);
};
exports.createBeeper = createBeeper;
const getBeepers = (req, res) => {
    res.json(beepers);
};
exports.getBeepers = getBeepers;
const updateBeeperStatus = (req, res) => {
    const { id } = req.params;
    const { status, longitude, latitude } = req.body;
    const beeper = beepers.find((b) => b.id === id);
    if (!beeper) {
        return res.status(404).json({ message: "Beeper not found" });
    }
    if (status === "deployed") {
        if (longitude && latitude) {
            beeper.longitude = longitude;
            beeper.latitude = latitude;
        }
        else {
            return res
                .status(400)
                .json({
                message: "Error",
            });
        }
    }
    beeper.status = status;
    res.json(beeper);
};
exports.updateBeeperStatus = updateBeeperStatus;
const deleteBeeper = (req, res) => {
    const { id } = req.params;
    beepers = beepers.filter((b) => b.id !== id);
    res.status(204).send();
};
exports.deleteBeeper = deleteBeeper;
