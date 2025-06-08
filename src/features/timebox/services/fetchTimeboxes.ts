import { Result, ok, err } from "@/lib/result"
import { Timebox } from "../use-timebox";
import { timeboxRepository } from "../timeboxRepo";
export function fetchTimeboxesFromDB(): Result<Timebox[], string> {
    // This function will call the repo for fetching timeboxes from dexie

    const result = timeboxRepository.fetchAllTimeboxes();
    if (!result.ok) {
        return err("Failed to fetch timeboxes from the database.");
    }
    return ok(result.data);

}