import { Status } from "./status_enum";

export interface Task {
    id: string;
    status: Status;
    name: string;
    description: string;
    assignedTo: string;
}
