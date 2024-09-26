import { Beeper } from "../models/beeperModel";
const jsonfile = require("jsonfile");
const DB_FILE = "./beepersData.json";
const { v4: uuidv4} = require('uuid');

export const readBeepers = async (): Promise<Beeper[]> => {
  try {
    const db = await jsonfile.readFile(DB_FILE);
    return db.beepers || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const writeBeepers = async (beepers: Beeper[]): Promise<void> => {
  try {
    const db = { beepers };
    await jsonfile.writeFile(DB_FILE, db, { spaces: 2 });
  } catch (error) {
    console.error("Error:", error);
    throw new Error("error");
  }
};

export const getAllBeepers = async (): Promise<Beeper[]> => {
  return await readBeepers();
};

export const getBeeperById = async (
  id: string
): Promise<Beeper | undefined> => {
  const beepers = await readBeepers();
  return beepers.find((beeper) => beeper.id === id);
};

export const createBeeper = async (newBeeper: Beeper): Promise<Beeper> => {
  const beepers = await readBeepers();
  const Id = uuidv4();
  newBeeper.id = Id.toString();
  newBeeper.created_at = new Date();
  newBeeper.exploded_at = -1;
  newBeeper.longitude = -1;
  newBeeper.latitude = -1;
  beepers.push(newBeeper);
  await writeBeepers(beepers);
  return newBeeper;
};

export const updateBeeper = async (
  id: string,
  updatedBeeper: Beeper
): Promise<Beeper | null> => {
  const beepers = await readBeepers();
  const index = beepers.findIndex((beeper) => beeper.id === id);
  if (index === -1) return null;
  beepers[index] = { ...beepers[index], ...updatedBeeper, id };
  await writeBeepers(beepers);
  return beepers[index];
};

export const deleteBeeper = async (id: string): Promise<boolean> => {
  const beepers = await readBeepers();
  const initialLength = beepers.length;
  const updatedBeepers = beepers.filter((beeper) => beeper.id !== id);
  if (updatedBeepers.length === initialLength) return false;
  await writeBeepers(updatedBeepers);
  return true;
};

export const getBeeperByStatus = async (
  status: string
): Promise<Beeper[]> => {
  const beepers = await readBeepers();
  return beepers.filter((beeper) => beeper.status == status);
};
