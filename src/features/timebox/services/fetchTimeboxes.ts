import { Result, ok, err } from "@/lib/result"
import { timeboxRepository } from "../timeboxRepo";
import { Timebox } from "../hooks/use-timeboxes";
export async function fetchTimeboxesFromDB(): Promise<Result<Timebox[], string>> {
    // This function will call the repo for fetching timeboxes from dexie

    const result = await timeboxRepository.fetchAllTimeboxes();
    console.log("fetchTimeboxesFromDB result:", result);
    if (!result.ok) {
        return err("Failed to fetch timeboxes from the database.");
    }
    return ok(result.data);

}