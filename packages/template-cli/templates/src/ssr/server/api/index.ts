import express from "express";
import healthEndPoint from "./health"
import withGetMenuEndpoints from "./menu/gets";
import withPostMenuEndpoints from "./menu/posts";

const router = express.Router();

// get endpoints
withGetMenuEndpoints(router);

//post endpoints
withPostMenuEndpoints(router);

// health endpoint
healthEndPoint(router)

export default router;
