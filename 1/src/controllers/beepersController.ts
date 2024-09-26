import { Request, Response } from "express";
import { Beeper } from "../models/beeperModel";
import * as beeperService from "../service/beepersService";

export const getBeepers = async (req: Request, res: Response) => {
  try {
    const beepers = await beeperService.getAllBeepers();
    res.json(beepers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching beepers" });
  }
};

export const getBeeperById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const beeper = await beeperService.getBeeperById(id);
    if (beeper) {
      res.json(beeper);
    } else {
      res.status(404).json({ message: "Beeper not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching beeper" });
  }
};

export const createBeeper = async (req: Request, res: Response) => {
  try {
    const newBeeper: Beeper = {
      id: "",
      name: req.body.name,
      status: "manufactured",
      created_at: new Date(),
      longitude: -1,
      latitude: -1,
      exploded_at: -1,
    };
    const createdBeeper = await beeperService.createBeeper(newBeeper);
    res.status(201).json(createdBeeper);
  } catch (error) {
    res.status(500).json({ message: "Error creating beeper" });
  }
};

export const updateBeeperStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, longitude, latitude } = req.body;

  try {
    const beeper = await beeperService.getBeeperById(id);
    if (!beeper) {
      return res.status(404).json({ message: "Beeper not found" });
    }

    if (status === "deployed") {
      if (longitude && latitude) {
        beeper.longitude = longitude;
        beeper.latitude = latitude;
      } else {
        return res.status(400).json({
          message: "Longitude and latitude are required for deployed status",
        });
      }
    }

    beeper.status = status;
    const updatedBeeper = await beeperService.updateBeeper(id, beeper);
    res.json(updatedBeeper);
  } catch (error) {
    res.status(500).json({ message: "Error updating beeper status" });
  }
};

export const deleteBeeper = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const success = await beeperService.deleteBeeper(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Beeper not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting beeper" });
  }
};

export const getBeeperByStatus = async (req: Request, res: Response) => {
  const { status } = req.params;
  try {
    const beepers = await beeperService.getBeeperByStatus(status);
    res.json(beepers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching beepers" });
  }
};
