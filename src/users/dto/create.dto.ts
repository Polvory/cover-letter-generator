import {Paid} from '../users.model'

export class CreateUser {
    readonly user_id: string | number;
    readonly user_name?: string;
    readonly first_name?: string;
    readonly last_name?: string;
    readonly archive?: boolean;
    readonly options?: JSON;
    readonly paid?: Paid;
    readonly name_to_generate?: string;
    readonly achievements?: string;
}
