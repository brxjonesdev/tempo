import { timeboxRepository } from "../timeboxRepo";
import { Timebox } from "../use-timebox";
import {ok, err, Result} from "@/lib/result";

export function updatePersistedTimebox(
    id: string,
    updatedTimebox: Partial<Timebox>
): Result<boolean, string> {

    if (!id || !updatedTimebox) {
        return err("Invalid input: must provide a valid ID and updated timebox data.");
    }
    
    // Here you would typically call the repository to update the timebox
    const result = timeboxRepository.updateTimebox(id, updatedTimebox);
    if (!result.ok) {
        return err("Failed to update timebox.");
    }
    
    return ok(true);

}