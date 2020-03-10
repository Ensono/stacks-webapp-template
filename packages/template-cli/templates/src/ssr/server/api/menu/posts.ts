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
            const {data} = response
            logger.info(response.data, "axios-res")
            res.send(data || {})
            res.end()
        } catch (err) {
            logger.error(err, "axios-error")
            res.status(500).end();
        }
    });
};
