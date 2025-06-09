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

    updateTimebox: (timeboxId: string, updatedTimebox: Partial<Timebox>): Result<boolean, string> => {
        // Here you would typically update the timebox in a database or state management system
        console.log(`Timebox updated: ID=${timeboxId}`, updatedTimebox);
        return ok(true); // Return true if successful
    },

    deleteTimebox: (timeboxId: string): Result<boolean, string> => {
        // Here you would typically delete the timebox from a database or state management system
        console.log(`Timebox deleted: ID=${timeboxId}`);
        return ok(true) // Return true if successful
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


