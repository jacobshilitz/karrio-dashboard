/* tslint:disable */
/* eslint-disable */
/**
 * Karrio API
 *  ## API Reference  Karrio is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Karrio API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Karrio API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.4.3`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Karrio utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"count\": 100,     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [         { ... },     ] } ```  ## Environments  The Karrio API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.  
 *
 * The version of the OpenAPI document: 2022.4.3
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Address,
    AddressFromJSON,
    AddressToJSON,
    AddressData,
    AddressDataFromJSON,
    AddressDataToJSON,
    AddressList,
    AddressListFromJSON,
    AddressListToJSON,
    ErrorResponse,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    Operation,
    OperationFromJSON,
    OperationToJSON,
} from '../models';

export interface CreateRequest {
    data: AddressData;
}

export interface DiscardRequest {
    id: string;
}

export interface ListRequest {
    limit?: number;
    offset?: number;
}

export interface RetrieveRequest {
    id: string;
}

export interface UpdateRequest {
    id: string;
    data: AddressData;
}

/**
 * 
 */
export class AddressesApi extends runtime.BaseAPI {

    /**
     * Create a new address.
     * Create an address
     */
    async createRaw(requestParameters: CreateRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Address>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling create.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/addresses`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddressDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AddressFromJSON(jsonValue));
    }

    /**
     * Create a new address.
     * Create an address
     */
    async create(requestParameters: CreateRequest, initOverrides?: RequestInit): Promise<Address> {
        const response = await this.createRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Discard an address.
     * Discard an address
     */
    async discardRaw(requestParameters: DiscardRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Operation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling discard.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/addresses/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OperationFromJSON(jsonValue));
    }

    /**
     * Discard an address.
     * Discard an address
     */
    async discard(requestParameters: DiscardRequest, initOverrides?: RequestInit): Promise<Operation> {
        const response = await this.discardRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve all addresses.
     * List all addresses
     */
    async listRaw(requestParameters: ListRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<AddressList>> {
        const queryParameters: any = {};

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
            path: `/v1/addresses`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AddressListFromJSON(jsonValue));
    }

    /**
     * Retrieve all addresses.
     * List all addresses
     */
    async list(requestParameters: ListRequest = {}, initOverrides?: RequestInit): Promise<AddressList> {
        const response = await this.listRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve an address.
     * Retrieve an address
     */
    async retrieveRaw(requestParameters: RetrieveRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Address>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Token authentication
        }

        const response = await this.request({
            path: `/v1/addresses/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AddressFromJSON(jsonValue));
    }

    /**
     * Retrieve an address.
     * Retrieve an address
     */
    async retrieve(requestParameters: RetrieveRequest, initOverrides?: RequestInit): Promise<Address> {
        const response = await this.retrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update an address.
     * Update an address
     */
    async updateRaw(requestParameters: UpdateRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Address>> {
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
            path: `/v1/addresses/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: AddressDataToJSON(requestParameters.data),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AddressFromJSON(jsonValue));
    }

    /**
     * update an address.
     * Update an address
     */
    async update(requestParameters: UpdateRequest, initOverrides?: RequestInit): Promise<Address> {
        const response = await this.updateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
