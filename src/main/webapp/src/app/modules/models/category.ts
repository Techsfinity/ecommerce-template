import {ObjectWithLinks} from "../../shared/services/rest/models";
import {Product} from "./product";

export class Category extends ObjectWithLinks {

    name?: string;
    products?: Product[];

}