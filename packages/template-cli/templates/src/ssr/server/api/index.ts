import express from "express";
import withGetMenuEndpoints from "./menu/gets";
import withPostMenuEndpoints from "./menu/posts";

const router = express.Router();

// get endpoints
withGetMenuEndpoints(router);

//post endpoints
withPostMenuEndpoints(router);

export default router;
