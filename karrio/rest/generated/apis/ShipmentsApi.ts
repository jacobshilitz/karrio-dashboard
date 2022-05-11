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


import * as runtime from '../runtime';
import {
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    OperationResponse,
    OperationResponseFromJSON,
    OperationResponseToJSON,
    Shipment,
    ShipmentFromJSON,
    ShipmentToJSON,
    ShipmentData,
    ShipmentDataFromJSON,
    ShipmentDataToJSON,
    ShipmentList,
    ShipmentListFromJSON,
    ShipmentListToJSON,
    ShipmentPurchaseData,
    ShipmentPurchaseDataFromJSON,
    ShipmentPurchaseDataToJSON,
    ShipmentRateData,
    ShipmentRateDataFromJSON,
    ShipmentRateDataToJSON,
    ShipmentUpdateData,
    ShipmentUpdateDataFromJSON,
    ShipmentUpdateDataToJSON,
} from '../models';

export interface CancelRequest {
    id: string;
}

export interface CreateRequest {
    data: ShipmentData;
    test?: boolean | null;
}

export interface ListRequest {
    address?: string;
    createdAfter?: string;
    createdBefore?: string;
    carrierName?: string;
    reference?: string;
    service?: string;
    status?: string;
    optionKey?: string;
    optionValue?: string;
    metadataKey?: string;
    metadataValue?: string;
    testMode?: string;
    limit?: number;
    offset?: number;
}

export interface PurchaseRequest {
    id: string;
    data: ShipmentPurchaseData;
}

export interface RatesRequest {
    id: string;
    data: ShipmentRateData;
}

export interface RetrieveRequest {
    id: string;
}

export interface UpdateRequest {
    id: string;
    data: ShipmentUpdateData;
}

/**
 * 
 */
export class ShipmentsApi extends runtime.BaseAPI {

    /**
     * Void a shipment with the associated label.
     * Cancel a shipment
     */
    async cancelRaw(requestParameters: CancelRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<OperationResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling cancel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationResponseFromJSON(jsonValue));
    }

    /**
     * Void a shipment with the associated label.
     * Cancel a shipment
     */
    async cancel(requestParameters: CancelRequest, initOverrides?: RequestInit): Promise<OperationResponse> {
        const response = await this.cancelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a new shipment instance.
     * Create a shipment
     */
    async createRaw(requestParameters: CreateRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling create.');
        }

        const queryParameters: any = {};

        if (requestParameters.test !== undefined) {
            queryParameters['test'] = requestParameters.test;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShipmentDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Create a new shipment instance.
     * Create a shipment
     */
    async create(requestParameters: CreateRequest, initOverrides?: RequestInit): Promise<Shipment> {
        const response = await this.createRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve all shipments.
     * List all shipments
     */
    async listRaw(requestParameters: ListRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ShipmentList>> {
        const queryParameters: any = {};

        if (requestParameters.address !== undefined) {
            queryParameters['address'] = requestParameters.address;
        }

        if (requestParameters.createdAfter !== undefined) {
            queryParameters['created_after'] = requestParameters.createdAfter;
        }

        if (requestParameters.createdBefore !== undefined) {
            queryParameters['created_before'] = requestParameters.createdBefore;
        }

        if (requestParameters.carrierName !== undefined) {
            queryParameters['carrier_name'] = requestParameters.carrierName;
        }

        if (requestParameters.reference !== undefined) {
            queryParameters['reference'] = requestParameters.reference;
        }

        if (requestParameters.service !== undefined) {
            queryParameters['service'] = requestParameters.service;
        }

        if (requestParameters.status !== undefined) {
            queryParameters['status'] = requestParameters.status;
        }

        if (requestParameters.optionKey !== undefined) {
            queryParameters['option_key'] = requestParameters.optionKey;
        }

        if (requestParameters.optionValue !== undefined) {
            queryParameters['option_value'] = requestParameters.optionValue;
        }

        if (requestParameters.metadataKey !== undefined) {
            queryParameters['metadata_key'] = requestParameters.metadataKey;
        }

        if (requestParameters.metadataValue !== undefined) {
            queryParameters['metadata_value'] = requestParameters.metadataValue;
        }

        if (requestParameters.testMode !== undefined) {
            queryParameters['test_mode'] = requestParameters.testMode;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentListFromJSON(jsonValue));
    }

    /**
     * Retrieve all shipments.
     * List all shipments
     */
    async list(requestParameters: ListRequest = {}, initOverrides?: RequestInit): Promise<ShipmentList> {
        const response = await this.listRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Select your preferred rates to buy a shipment label.
     * Buy a shipment label
     */
    async purchaseRaw(requestParameters: PurchaseRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling purchase.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling purchase.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}/purchase`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShipmentPurchaseDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Select your preferred rates to buy a shipment label.
     * Buy a shipment label
     */
    async purchase(requestParameters: PurchaseRequest, initOverrides?: RequestInit): Promise<Shipment> {
        const response = await this.purchaseRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Refresh the list of the shipment rates
     * Fetch new shipment rates
     */
    async ratesRaw(requestParameters: RatesRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling rates.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling rates.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}/rates`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShipmentRateDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Refresh the list of the shipment rates
     * Fetch new shipment rates
     */
    async rates(requestParameters: RatesRequest, initOverrides?: RequestInit): Promise<Shipment> {
        const response = await this.ratesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve a shipment.
     * Retrieve a shipment
     */
    async retrieveRaw(requestParameters: RetrieveRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * Retrieve a shipment.
     * Retrieve a shipment
     */
    async retrieve(requestParameters: RetrieveRequest, initOverrides?: RequestInit): Promise<Shipment> {
        const response = await this.retrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * This operation allows for updating properties of a shipment including `label_type`, `reference`, `payment`, `options` and `metadata`. It is not for editing the parcels of a shipment.
     * Update a shipment
     */
    async updateRaw(requestParameters: UpdateRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Shipment>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling update.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling update.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/shipments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ShipmentUpdateDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ShipmentFromJSON(jsonValue));
    }

    /**
     * This operation allows for updating properties of a shipment including `label_type`, `reference`, `payment`, `options` and `metadata`. It is not for editing the parcels of a shipment.
     * Update a shipment
     */
    async update(requestParameters: UpdateRequest, initOverrides?: RequestInit): Promise<Shipment> {
        const response = await this.updateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
