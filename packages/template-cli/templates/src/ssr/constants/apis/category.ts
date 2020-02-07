import { Api, HTTPMethod, buildExport } from ".";

class CategoryApi implements Api {
  baseURL = "/";
  version = "v1";
  endpoints = {
    getCategory: {
      routeDefinition: "getcategory/:id/:categoryId",
      getInternalURL: (id: string, categoryId: string) =>
        `/category/:${id}/:${categoryId}`,
      getExternalURL: (id: string, categoryId: string) =>
        `menu/${id}/category/items/${categoryId}`,
      method: HTTPMethod.get
    },
    deleteCategory: {
      routeDefinition: "getcategory/:id/:categoryId",
      getInternalURL: (id: string, categoryId: string) =>
        `/category/:${id}/:${categoryId}`,
      getExternalURL: (id: string, categoryId: string) =>
        `menu/${id}/category/items/${categoryId}`,
      method: HTTPMethod.delete
    },
    updateCategory: {
      routeDefinition: "getcategory/:id/:categoryId",
      getInternalURL: (id: string, categoryId: string) =>
        `/category/:${id}/:${categoryId}`,
      getExternalURL: (id: string, categoryId: string) =>
        `menu/${id}/category/items/whatever/${categoryId}`,
      method: HTTPMethod.put
    }
  };
}

const categoryApi = new CategoryApi();
export default (endpoint: keyof typeof categoryApi.endpoints) =>
  buildExport(categoryApi, endpoint);
