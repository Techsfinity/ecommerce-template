import {ObjectWithLinks} from "../../shared/services/rest/models";
import {Category} from "./category";
import {Image} from "./image";

export class Product extends ObjectWithLinks {
    name?: string;
    quantity?: number;
    code?: string;
    description?: string;
    price?: number;
    category?: Category | string;
    unit?: string;

    //additional for other specs
    product?: string;
    unitPrice?: number;

    //store image names
    images?: string[];

    imageUrls?: Image[];
}