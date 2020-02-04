import morgan from "morgan";
import { Logger } from "../../core/root-logger";

let httpLogger;

if (process.env.NODE_ENV === "production") {
  httpLogger = morgan("common", {
    skip: function(req, res) {
      return res.statusCode < 400;
    },
    stream: Logger.stream
  });
} else {
  httpLogger = morgan("common", { stream: Logger.stream });
}

export default httpLogger;
