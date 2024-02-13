import {ObjectWithLinks} from "../../shared/services/rest/models";

export class Comment extends ObjectWithLinks {

    description?: string;
    date?: string;
    userName?: string;

}