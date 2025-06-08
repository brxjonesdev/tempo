import { Result, ok, err } from "@/lib/result";
import { Timebox } from "../use-timebox";
import { timeboxRepository } from "../timeboxRepo";

export function addTimeboxToQueue(timebox: Timebox ): Result<boolean, string> {
  if (!timebox || !timebox.goal || timebox.duration <= 0) {
    return err("Invalid timebox: must have a goal and a positive duration.");
  }

  const result = timeboxRepository.addTimebox(timebox);
    if (!result) {
        return err("Failed to add timebox to queue.");
    }
  return ok(true);

}