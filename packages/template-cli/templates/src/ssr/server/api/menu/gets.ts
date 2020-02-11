import axios from "../../core/axios";
import { Router } from "express";
import api from "../../../constants/apis/menu";
import logger from "../../core/root-logger";

const getMenuList = api("getMenuList");
const getMenu = api("getMenu");

export default (router: Router) => {
  router.get(getMenuList.routeDefinition, async (req, res) => {
    try {
      logger.info(req.params.id);
      logger.info(req.params);
      logger.info(req.path);
      logger.info(req.hostname);
      logger.info(getMenuList.url());
      const response = await axios({
        url: getMenuList.url(),
        method: getMenuList.method
      });
      res.send(response.data);
      logger.info(response.data, "debug-get-res");
    } catch (err) {
      logger.error(err, "axios-error");
      res.status(500).end();
    }
  });

  router.get(getMenu.routeDefinition, async (req, res) => {
    const {
      query: { id }
    } = req;
    try {
      const response = await axios({
        url: getMenu.url(),
        method: getMenu.method
      });
      res.send(response);
    } catch (err) {
      logger.error(err);
      res.status(500).end();
    }
  });
};
