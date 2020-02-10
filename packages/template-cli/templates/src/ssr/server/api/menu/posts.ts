import axios from "axios";
import api from "../../../constants/apis/menu";
import logger from "../../core/root-logger";
import { Router } from "express";

const addMenu = api("addMenu");

export default (router: Router) => {
  router.post(addMenu.routeDefinition, async (req, res) => {
    const { body } = req;
    try {
      const response = await axios({
        url: addMenu.url(),
        method: addMenu.method,
        data: body
      });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).end();
    }
  });
};
