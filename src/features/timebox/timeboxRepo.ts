import { ok, Result, err} from '@/lib/result';
import { db } from '../../../db';
import { Timebox } from './hooks/use-timeboxes';

export const timeboxRepository = {

    addTimebox: async (timebox: Timebox): Promise<Result<boolean, string>> => {
        try{
            await db.timeboxes.add(timebox);
            return ok(true); 

        }catch (error) {
            return err(error instanceof Error ? error.message : "Failed to add timebox to the database.");
        }
    },

    updateTimebox: async (timeboxId: string, updatedTimebox: Partial<Timebox>): Promise<Result<boolean, string>> => {
        try {
            if (!timeboxId || !updatedTimebox) {
                return err("Invalid input: must provide a valid ID and updated timebox data.");
            }
            await db.timeboxes.update(timeboxId, updatedTimebox);
            console.log(`Timebox updated: ID=${timeboxId}, Updated Data=${JSON.stringify(updatedTimebox)}`);
            return ok(true);


        } catch (error) {
            return err(error instanceof Error ? error.message : "Failed to update timebox.");
        }
    },

    deleteTimebox: async (timeboxId: string): Promise<Result<boolean, string>> => {
        try {
            if (!timeboxId) {
                return err("Invalid input: must provide a valid ID to delete the timebox.");
            }
            await db.timeboxes.delete(timeboxId);
            return ok(true);
        } catch (error) {
            return err(error instanceof Error ? error.message : "Failed to delete timebox.");
        }
    },

    fetchAllTimeboxes: async (): Promise<Result<Timebox[], string>> => {
        try{
            const timeboxes = await db.timeboxes.toArray();
            return ok(timeboxes);
        }catch (error) {
            console.error("Error fetching timeboxes:", error);
            return err("Failed to fetch timeboxes from the database.");
        }
    }
}


