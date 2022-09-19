import { z } from 'zod';
import { IVehicle, VehicleZodSchema } from './IVehicle';

export const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type ICar = z.infer<typeof CarZodSchema> & IVehicle;
