import {ObjectWithLinks} from "../services/rest/models";

export class User extends ObjectWithLinks {

    sub?: string;
    userName?: string;
    email?: string;
    active?: string;

}
