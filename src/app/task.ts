import { Status } from "./status_enum";

export interface Task {
    id: string;
    status: Status;
    title: string;
    description: string;
    assignedTo: string;
}
