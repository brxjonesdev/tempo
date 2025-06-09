import { Result, ok, err } from "@/lib/result";
import { timeboxRepository } from "../timeboxRepo";

export function deleteTimeboxByID(id: string): Result<boolean, string> {
    if (!id) {
        return err("Invalid input: must provide a valid ID.");
    }

    // Here you would typically call the repository to delete the timebox
    const result = timeboxRepository.deleteTimebox(id);
    if (!result.ok) {
        return err("Failed to delete timebox.");
    }

    return ok(true);
}