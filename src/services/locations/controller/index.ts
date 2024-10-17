import { Request, Response } from 'express';
import { locationService } from '../services';;

export const createLocation = async (req: Request, res: Response) => {
  try {
    const data = req.body; // maxDistance, price, startLat, startLng, endLat, endLng, direction
    const newLocation = await locationService.createLocation(data);
    res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create location" });
  }
};

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const locations = await locationService.getAllLocations();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await locationService.getLocationById(Number(id));
    if (location) {
      res.status(200).json(location);
    } else {
      res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch location" });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedLocation = await locationService.updateLocation(Number(id), data);
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ error: "Failed to update location" });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await locationService.deleteLocation(+id);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete location" });
  }
};