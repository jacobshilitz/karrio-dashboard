/* tslint:disable */
/* eslint-disable */
/**
 * Karrio API
 *  ## API Reference  Karrio is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Karrio API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Karrio API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.6.1`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Environments  The Karrio API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Karrio utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"count\": 100,     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [         { ... },     ] } ```  ## Metadata  Updateable Karrio objects—including Shipment and Order—have a metadata parameter. You can use this parameter to attach key-value data to these Karrio objects.  Metadata is useful for storing additional, structured information on an object. As an example, you could store your user\'s full name and corresponding unique identifier from your system on a Karrio Order object.  Do not store any sensitive information as metadata.  ## Authentication  API keys are used to authenticate requests. You can view and manage your API keys in the Dashboard.  Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.  Authentication to the API is performed via HTTP Basic Auth. Provide your API token as the basic auth username value. You do not need to provide a password.  ```shell $ curl https://instance.api.com/v1/shipments \\     -u key_xxxxxx: # The colon prevents curl from asking for a password. ```  If you need to authenticate via bearer auth (e.g., for a cross-origin request), use `-H \"Authorization: Token key_xxxxxx\"` instead of `-u key_xxxxxx`.  All API requests must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure). API requests without authentication will also fail.  
 *
 * The version of the OpenAPI document: 2022.6.1
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

/**
 * 
 * @export
 * @interface ShipmentData
 */
export interface ShipmentData {
    /**
     * 
     * @type {AddressData}
     * @memberof ShipmentData
     */
    shipper: AddressData;
    /**
     * 
     * @type {AddressData}
     * @memberof ShipmentData
     */
    recipient: AddressData;
    /**
     * The shipment's parcels
     * @type {Array<ParcelData>}
     * @memberof ShipmentData
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
     * @memberof ShipmentData
     */
    options?: object;
    /**
     * 
     * @type {Payment}
     * @memberof ShipmentData
     */
    payment?: Payment;
    /**
     * 
     * @type {CustomsData}
     * @memberof ShipmentData
     */
    customs?: CustomsData;
    /**
     * The shipment reference
     * @type {string}
     * @memberof ShipmentData
     */
    reference?: string | null;
    /**
     * The shipment label file type.
     * @type {string}
     * @memberof ShipmentData
     */
    label_type?: ShipmentDataLabelTypeEnum;
    /**
     * **Specify a service to Buy a label in one call without rating.**
     * @type {string}
     * @memberof ShipmentData
     */
    service?: string;
    /**
     * 
     * The requested carrier service for the shipment.
     * 
     * Please consult the reference for specific carriers services.<br/>
     * Note that this is a list because on a Multi-carrier rate request you could specify a service per carrier.
     * @type {Array<string>}
     * @memberof ShipmentData
     */
    services?: Array<string> | null;
    /**
     * 
     * The list of configured carriers you wish to get rates from.
     * 
     * *Note that the request will be sent to all carriers in nothing is specified*
     * @type {Array<string>}
     * @memberof ShipmentData
     */
    carrier_ids?: Array<string> | null;
    /**
     * User metadata for the shipment
     * @type {object}
     * @memberof ShipmentData
     */
    metadata?: object;
}

/**
* @export
* @enum {string}
*/
export enum ShipmentDataLabelTypeEnum {
    Pdf = 'PDF',
    Zpl = 'ZPL',
    Png = 'PNG'
}

export function ShipmentDataFromJSON(json: any): ShipmentData {
    return ShipmentDataFromJSONTyped(json, false);
}

export function ShipmentDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShipmentData {
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
        'service': !exists(json, 'service') ? undefined : json['service'],
        'services': !exists(json, 'services') ? undefined : json['services'],
        'carrier_ids': !exists(json, 'carrier_ids') ? undefined : json['carrier_ids'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
    };
}

export function ShipmentDataToJSON(value?: ShipmentData | null): any {
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
        'service': value.service,
        'services': value.services,
        'carrier_ids': value.carrier_ids,
        'metadata': value.metadata,
    };
}

