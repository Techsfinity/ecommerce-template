import {AccessTokenResponse} from "../../models/auth/access-token-response";
import {Module} from "../../models/module";

export class Logout {
    static readonly type = '[AUTH] Logout';
}

export class SaveToken {
    static readonly type = '[AUTH] SaveToken';
    constructor(public payload: AccessTokenResponse) {}
}

export class SaveUserModules {
    static readonly type = '[AUTH] Save User Modules';
    constructor(public payload: Module[]) {}
}



