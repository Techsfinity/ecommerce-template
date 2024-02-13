import {ObjectWithLinks} from "../../shared/services/rest/models";
import {Product} from "./product";

export class SelectProduct extends ObjectWithLinks {

    product?: Product;
    quantity?: number;

}