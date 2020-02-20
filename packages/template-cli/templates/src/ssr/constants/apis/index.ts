import { Method } from "axios";
import getConfig from 'next/config'

export enum HTTPMethod {
    "get",
    "post",
    "delete",
    "put",
    "patch"
}

export function apiURL(api: Api) {
    return endpoint => (...params: Array<any>) =>
        `${api.baseURL}/${api.version}/${api.endpoints[endpoint].getExternalURL(
            ...params
        )}`;
}

export function apiMethod(api: Api) {
    return endpoint => HTTPMethod[api.endpoints[endpoint].method] as Method;
}

export function internalEndpoint(api: Api) {
    return endpoint => (...params: Array<any>) =>
      `${
        getConfig().publicRuntimeConfig.APP_BASE_PATH
      }/${api.endpoints[endpoint].getInternalURL(...params)}`
}

export function routeDefinition(api: Api) {
    return endpoint => api.endpoints[endpoint].routeDefinition;
}

export interface Endpoint {
    [key: string]: {
        routeDefinition: string;
        getExternalURL: (...params) => string;
        method: HTTPMethod;
        getInternalURL: (...params) => string;
    };
}

export function buildExport(api: Api, endpoint: string) {
    return {
        url: apiURL(api)(endpoint),
        method: apiMethod(api)(endpoint),
        internalEndpoint: internalEndpoint(api)(endpoint),
        routeDefinition: routeDefinition(api)(endpoint)
    };
}

export interface Api {
    baseURL: string;
    version: string;
    internalBasePath: string;
    endpoints: Endpoint;
}
