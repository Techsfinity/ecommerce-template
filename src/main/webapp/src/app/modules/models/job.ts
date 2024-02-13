import {ObjectWithLinks} from "../../shared/services/rest/models";
import {Product} from "./product";
import {Customer} from "./customer";
import {SelectProduct} from "./select-product";

export class Job extends ObjectWithLinks {

    name?: string;
    
    status?: string;
    type?: string;
    customer?: Customer;

    endDate?: string;
    comments?: any[];
    remarks?: string;

    extraCost?: number;
    extraCostName?: string;
    advance?: number;
    total?: number;

    products?: Product[];
    selectProducts?: SelectProduct[];

}