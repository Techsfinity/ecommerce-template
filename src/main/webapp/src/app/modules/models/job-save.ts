import {ObjectWithLinks} from "../../shared/services/rest/models";
import {Product} from "./product";

export class JobSave extends ObjectWithLinks {

    constructor() {
        super();
    }

    jobName?: string;

    jobLabel?: string;

    status?: string;
    type?: string;
    customerName?: string;

    endDate?: string;
    comment?: string;
    remarks?: string;

    extraCost?: number;
    advance?: number;
    subTotal?: number;
    total?: number;

    products?: Product[];

}