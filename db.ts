import Dexie, { type EntityTable } from 'dexie';

interface Timebox {
    id: string;
    goal: string;
    duration: number; // in seconds
    isActive: boolean;
    isCompleted: boolean;
    postBoxReview?: string;
}

const db = new Dexie('TimeboxDB') as Dexie & {
    timeboxes: EntityTable<Timebox, 'id'>;
}

db.version(1).stores({
    timeboxes: '++id, goal, duration, isActive, isCompleted, postBoxReview'
})

export type { Timebox };
export { db }