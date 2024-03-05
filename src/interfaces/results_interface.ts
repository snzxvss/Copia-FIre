import { Client } from "./client_interface";
import { emails } from "./email_interface";

export interface results {
    clients: Client[];
    emails?: emails[];
}