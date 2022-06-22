/* tslint:disable */
/* eslint-disable */
/**
 * Karrio API
 *  ## API Reference  Karrio is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Karrio API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Karrio API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.4.4`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Karrio utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"count\": 100,     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [         { ... },     ] } ```  ## Environments  The Karrio API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2022.4.4
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AddressData
 */
export interface AddressData {
    /**
     * 
     * The address postal code
     * 
     * **(required for shipment purchase)**
     * @type {string}
     * @memberof AddressData
     */
    postal_code?: string | null;
    /**
     * 
     * The address city.
     * 
     * **(required for shipment purchase)**
     * @type {string}
     * @memberof AddressData
     */
    city?: string | null;
    /**
     * The party frederal tax id
     * @type {string}
     * @memberof AddressData
     */
    federal_tax_id?: string | null;
    /**
     * The party state id
     * @type {string}
     * @memberof AddressData
     */
    state_tax_id?: string | null;
    /**
     * 
     * attention to
     * 
     * **(required for shipment purchase)**
     * @type {string}
     * @memberof AddressData
     */
    person_name?: string | null;
    /**
     * The company name if the party is a company
     * @type {string}
     * @memberof AddressData
     */
    company_name?: string | null;
    /**
     * The address country code
     * @type {string}
     * @memberof AddressData
     */
    country_code: AddressDataCountryCodeEnum;
    /**
     * The party email
     * @type {string}
     * @memberof AddressData
     */
    email?: string | null;
    /**
     * The party phone number.
     * @type {string}
     * @memberof AddressData
     */
    phone_number?: string | null;
    /**
     * The address state code
     * @type {string}
     * @memberof AddressData
     */
    state_code?: string | null;
    /**
     * The address suburb if known
     * @type {string}
     * @memberof AddressData
     */
    suburb?: string | null;
    /**
     * Indicate if the address is residential or commercial (enterprise)
     * @type {boolean}
     * @memberof AddressData
     */
    residential?: boolean | null;
    /**
     * 
     * The address line with street number <br/>
     * **(required for shipment purchase)**
     * @type {string}
     * @memberof AddressData
     */
    address_line1?: string | null;
    /**
     * The address line with suite number
     * @type {string}
     * @memberof AddressData
     */
    address_line2?: string | null;
    /**
     * Indicate if the address should be validated
     * @type {boolean}
     * @memberof AddressData
     */
    validate_location?: boolean | null;
}

/**
* @export
* @enum {string}
*/
export enum AddressDataCountryCodeEnum {
    Ad = 'AD',
    Ae = 'AE',
    Af = 'AF',
    Ag = 'AG',
    Ai = 'AI',
    Al = 'AL',
    Am = 'AM',
    An = 'AN',
    Ao = 'AO',
    Ar = 'AR',
    As = 'AS',
    At = 'AT',
    Au = 'AU',
    Aw = 'AW',
    Az = 'AZ',
    Ba = 'BA',
    Bb = 'BB',
    Bd = 'BD',
    Be = 'BE',
    Bf = 'BF',
    Bg = 'BG',
    Bh = 'BH',
    Bi = 'BI',
    Bj = 'BJ',
    Bm = 'BM',
    Bn = 'BN',
    Bo = 'BO',
    Br = 'BR',
    Bs = 'BS',
    Bt = 'BT',
    Bw = 'BW',
    By = 'BY',
    Bz = 'BZ',
    Ca = 'CA',
    Cd = 'CD',
    Cf = 'CF',
    Cg = 'CG',
    Ch = 'CH',
    Ci = 'CI',
    Ck = 'CK',
    Cl = 'CL',
    Cm = 'CM',
    Cn = 'CN',
    Co = 'CO',
    Cr = 'CR',
    Cu = 'CU',
    Cv = 'CV',
    Cy = 'CY',
    Cz = 'CZ',
    De = 'DE',
    Dj = 'DJ',
    Dk = 'DK',
    Dm = 'DM',
    Do = 'DO',
    Dz = 'DZ',
    Ec = 'EC',
    Ee = 'EE',
    Eg = 'EG',
    Er = 'ER',
    Es = 'ES',
    Et = 'ET',
    Fi = 'FI',
    Fj = 'FJ',
    Fk = 'FK',
    Fm = 'FM',
    Fo = 'FO',
    Fr = 'FR',
    Ga = 'GA',
    Gb = 'GB',
    Gd = 'GD',
    Ge = 'GE',
    Gf = 'GF',
    Gg = 'GG',
    Gh = 'GH',
    Gi = 'GI',
    Gl = 'GL',
    Gm = 'GM',
    Gn = 'GN',
    Gp = 'GP',
    Gq = 'GQ',
    Gr = 'GR',
    Gt = 'GT',
    Gu = 'GU',
    Gw = 'GW',
    Gy = 'GY',
    Hk = 'HK',
    Hn = 'HN',
    Hr = 'HR',
    Ht = 'HT',
    Hu = 'HU',
    Ic = 'IC',
    Id = 'ID',
    Ie = 'IE',
    Il = 'IL',
    In = 'IN',
    Iq = 'IQ',
    Ir = 'IR',
    Is = 'IS',
    It = 'IT',
    Je = 'JE',
    Jm = 'JM',
    Jo = 'JO',
    Jp = 'JP',
    Ke = 'KE',
    Kg = 'KG',
    Kh = 'KH',
    Ki = 'KI',
    Km = 'KM',
    Kn = 'KN',
    Kp = 'KP',
    Kr = 'KR',
    Kv = 'KV',
    Kw = 'KW',
    Ky = 'KY',
    Kz = 'KZ',
    La = 'LA',
    Lb = 'LB',
    Lc = 'LC',
    Li = 'LI',
    Lk = 'LK',
    Lr = 'LR',
    Ls = 'LS',
    Lt = 'LT',
    Lu = 'LU',
    Lv = 'LV',
    Ly = 'LY',
    Ma = 'MA',
    Mc = 'MC',
    Md = 'MD',
    Me = 'ME',
    Mg = 'MG',
    Mh = 'MH',
    Mk = 'MK',
    Ml = 'ML',
    Mm = 'MM',
    Mn = 'MN',
    Mo = 'MO',
    Mp = 'MP',
    Mq = 'MQ',
    Mr = 'MR',
    Ms = 'MS',
    Mt = 'MT',
    Mu = 'MU',
    Mv = 'MV',
    Mw = 'MW',
    Mx = 'MX',
    My = 'MY',
    Mz = 'MZ',
    Na = 'NA',
    Nc = 'NC',
    Ne = 'NE',
    Ng = 'NG',
    Ni = 'NI',
    Nl = 'NL',
    No = 'NO',
    Np = 'NP',
    Nr = 'NR',
    Nu = 'NU',
    Nz = 'NZ',
    Om = 'OM',
    Pa = 'PA',
    Pe = 'PE',
    Pf = 'PF',
    Pg = 'PG',
    Ph = 'PH',
    Pk = 'PK',
    Pl = 'PL',
    Pr = 'PR',
    Pt = 'PT',
    Pw = 'PW',
    Py = 'PY',
    Qa = 'QA',
    Re = 'RE',
    Ro = 'RO',
    Rs = 'RS',
    Ru = 'RU',
    Rw = 'RW',
    Sa = 'SA',
    Sb = 'SB',
    Sc = 'SC',
    Sd = 'SD',
    Se = 'SE',
    Sg = 'SG',
    Sh = 'SH',
    Si = 'SI',
    Sk = 'SK',
    Sl = 'SL',
    Sm = 'SM',
    Sn = 'SN',
    So = 'SO',
    Sr = 'SR',
    Ss = 'SS',
    St = 'ST',
    Sv = 'SV',
    Sy = 'SY',
    Sz = 'SZ',
    Tc = 'TC',
    Td = 'TD',
    Tg = 'TG',
    Th = 'TH',
    Tj = 'TJ',
    Tl = 'TL',
    Tn = 'TN',
    To = 'TO',
    Tr = 'TR',
    Tt = 'TT',
    Tv = 'TV',
    Tw = 'TW',
    Tz = 'TZ',
    Ua = 'UA',
    Ug = 'UG',
    Us = 'US',
    Uy = 'UY',
    Uz = 'UZ',
    Va = 'VA',
    Vc = 'VC',
    Ve = 'VE',
    Vg = 'VG',
    Vi = 'VI',
    Vn = 'VN',
    Vu = 'VU',
    Ws = 'WS',
    Xb = 'XB',
    Xc = 'XC',
    Xe = 'XE',
    Xm = 'XM',
    Xn = 'XN',
    Xs = 'XS',
    Xy = 'XY',
    Ye = 'YE',
    Yt = 'YT',
    Za = 'ZA',
    Zm = 'ZM',
    Zw = 'ZW'
}

export function AddressDataFromJSON(json: any): AddressData {
    return AddressDataFromJSONTyped(json, false);
}

export function AddressDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddressData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'postal_code': !exists(json, 'postal_code') ? undefined : json['postal_code'],
        'city': !exists(json, 'city') ? undefined : json['city'],
        'federal_tax_id': !exists(json, 'federal_tax_id') ? undefined : json['federal_tax_id'],
        'state_tax_id': !exists(json, 'state_tax_id') ? undefined : json['state_tax_id'],
        'person_name': !exists(json, 'person_name') ? undefined : json['person_name'],
        'company_name': !exists(json, 'company_name') ? undefined : json['company_name'],
        'country_code': json['country_code'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'phone_number': !exists(json, 'phone_number') ? undefined : json['phone_number'],
        'state_code': !exists(json, 'state_code') ? undefined : json['state_code'],
        'suburb': !exists(json, 'suburb') ? undefined : json['suburb'],
        'residential': !exists(json, 'residential') ? undefined : json['residential'],
        'address_line1': !exists(json, 'address_line1') ? undefined : json['address_line1'],
        'address_line2': !exists(json, 'address_line2') ? undefined : json['address_line2'],
        'validate_location': !exists(json, 'validate_location') ? undefined : json['validate_location'],
    };
}

export function AddressDataToJSON(value?: AddressData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'postal_code': value.postal_code,
        'city': value.city,
        'federal_tax_id': value.federal_tax_id,
        'state_tax_id': value.state_tax_id,
        'person_name': value.person_name,
        'company_name': value.company_name,
        'country_code': value.country_code,
        'email': value.email,
        'phone_number': value.phone_number,
        'state_code': value.state_code,
        'suburb': value.suburb,
        'residential': value.residential,
        'address_line1': value.address_line1,
        'address_line2': value.address_line2,
        'validate_location': value.validate_location,
    };
}

