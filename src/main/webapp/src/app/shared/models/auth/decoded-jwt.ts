export class DecodedJwt {
    acr?: string;
    'allowed-origins'?: string;
    aud?: string;
    auth_time?: number;
    azp?: string;
    email?: string;
    email_verified?: boolean;
    exp?: number;
    given_name?: string;
    iat?: number;
    iss?: string;
    jti?: string;
    name?: string;
    nbf?: number;
    preferred_username?: string;
    realm_access?: any;
    resource_access?: any;
    scopes?: string;
    session_state?: string;
    sub?: string;
    typ?: string;

}

export function decodeJwt(token: string): DecodedJwt {
    const access_token: Array<string> = token.split('.');
    const accessTokenPayloadBase64: string = access_token[1].replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(accessTokenPayloadBase64));
} // decodeToken()