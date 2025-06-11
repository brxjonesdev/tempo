import { Timebox } from "../hooks/use-timeboxes";
import { timeboxRepository } from "../timeboxRepo";
import {ok, err, Result} from "@/lib/result";

export async function updatePersistedTimebox(
    id: string,
    updatedTimebox: Partial<Timebox>
): Promise<Result<boolean, string>> {

    if (!id || !updatedTimebox) {
        return err("Invalid input: must provide a valid ID and updated timebox data.");
    }
    
    // Here you would typically call the repository to update the timebox
    const result = await timeboxRepository.updateTimebox(id, updatedTimebox);
    if (!result.ok) {
        return err("Failed to update timebox.");
    }
    
    return ok(true);

}