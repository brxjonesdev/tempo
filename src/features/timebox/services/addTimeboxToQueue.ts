import { Result, ok, err } from "@/lib/result";
import { timeboxRepository } from "../timeboxRepo";
import { Timebox } from "../hooks/use-timeboxes";

export async function addTimeboxToQueue(timebox: Timebox ): Promise<Result<boolean, string>> {
  if (!timebox || !timebox.goal || timebox.duration <= 0) {
    return err("Invalid timebox: must have a goal and a positive duration.");
  }

  const result = await timeboxRepository.addTimebox(timebox);
    if (!result) {
        return err("Failed to add timebox to queue.");
    }
  return ok(true);

}