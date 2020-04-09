import { Router } from "express";
import logger from "../core/root-logger";

export default (router: Router) => {
    router.get("/healthz", async (req, res) => {
        try {
            const health_response = {
                OK: true,
                additionalInfo: {}
            }
            res.setHeader("stacks-k8s-probe", "live")
            res.status(200);
            res.send(health_response);
            res.end();
        } catch (err) {
            logger.error(err, "axios-error");
            res.setHeader("stacks-k8s-probe", "dead")
            res.status(500).end();
        }
    });
};
