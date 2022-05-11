/* tslint:disable */
/* eslint-disable */
/**
 * Karrio API
 *  ## API Reference  Karrio is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Karrio API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Karrio API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.4`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Karrio utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"count\": 100,     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [         { ... },     ] } ```  ## Environments  The Karrio API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2022.4
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    AddressData,
    AddressDataFromJSON,
    AddressDataFromJSONTyped,
    AddressDataToJSON,
} from './AddressData';
import {
    CustomsData,
    CustomsDataFromJSON,
    CustomsDataFromJSONTyped,
    CustomsDataToJSON,
} from './CustomsData';
import {
    ParcelData,
    ParcelDataFromJSON,
    ParcelDataFromJSONTyped,
    ParcelDataToJSON,
} from './ParcelData';
import {
    Payment,
    PaymentFromJSON,
    PaymentFromJSONTyped,
    PaymentToJSON,
} from './Payment';
import {
    Rate,
    RateFromJSON,
    RateFromJSONTyped,
    RateToJSON,
} from './Rate';

/**
 * 
 * @export
 * @interface ShippingRequest
 */
export interface ShippingRequest {
    /**
     * 
     * @type {AddressData}
     * @memberof ShippingRequest
     */
    shipper: AddressData;
    /**
     * 
     * @type {AddressData}
     * @memberof ShippingRequest
     */
    recipient: AddressData;
    /**
     * The shipment's parcels
     * @type {Array<ParcelData>}
     * @memberof ShippingRequest
     */
    parcels: Array<ParcelData>;
    /**
     * 
     * <details>
     * <summary>The options available for the shipment.</summary>
     * 
     * ```
     * {
     *     "currency": "USD",
     *     "insurance": 100.00,
     *     "cash_on_delivery": 30.00,
     *     "shipment_date": "2020-01-01",
     *     "dangerous_good": true,
     *     "declared_value": 150.00,
     *     "email_notification": true,
     *     "email_notification_to": "shipper@mail.com",
     *     "signature_confirmation": true,
     * }
     * ```
     * 
     * Please check the docs for carrier specific options.
     * </details>
     * @type {object}
     * @memberof ShippingRequest
     */
    options?: object;
    /**
     * 
     * @type {Payment}
     * @memberof ShippingRequest
     */
    payment?: Payment;
    /**
     * 
     * @type {CustomsData}
     * @memberof ShippingRequest
     */
    customs?: CustomsData;
    /**
     * The shipment reference
     * @type {string}
     * @memberof ShippingRequest
     */
    reference?: string | null;
    /**
     * The shipment label file type.
     * @type {string}
     * @memberof ShippingRequest
     */
    label_type?: ShippingRequestLabelTypeEnum;
    /**
     * The shipment selected rate.
     * @type {string}
     * @memberof ShippingRequest
     */
    selected_rate_id: string;
    /**
     * The list for shipment rates fetched previously
     * @type {Array<Rate>}
     * @memberof ShippingRequest
     */
    rates: Array<Rate>;
}

/**
* @export
* @enum {string}
*/
export enum ShippingRequestLabelTypeEnum {
    Pdf = 'PDF',
    Zpl = 'ZPL'
}

export function ShippingRequestFromJSON(json: any): ShippingRequest {
    return ShippingRequestFromJSONTyped(json, false);
}

export function ShippingRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShippingRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'shipper': AddressDataFromJSON(json['shipper']),
        'recipient': AddressDataFromJSON(json['recipient']),
        'parcels': ((json['parcels'] as Array<any>).map(ParcelDataFromJSON)),
        'options': !exists(json, 'options') ? undefined : json['options'],
        'payment': !exists(json, 'payment') ? undefined : PaymentFromJSON(json['payment']),
        'customs': !exists(json, 'customs') ? undefined : CustomsDataFromJSON(json['customs']),
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'label_type': !exists(json, 'label_type') ? undefined : json['label_type'],
        'selected_rate_id': json['selected_rate_id'],
        'rates': ((json['rates'] as Array<any>).map(RateFromJSON)),
    };
}

export function ShippingRequestToJSON(value?: ShippingRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'shipper': AddressDataToJSON(value.shipper),
        'recipient': AddressDataToJSON(value.recipient),
        'parcels': ((value.parcels as Array<any>).map(ParcelDataToJSON)),
        'options': value.options,
        'payment': PaymentToJSON(value.payment),
        'customs': CustomsDataToJSON(value.customs),
        'reference': value.reference,
        'label_type': value.label_type,
        'selected_rate_id': value.selected_rate_id,
        'rates': ((value.rates as Array<any>).map(RateToJSON)),
    };
}

