import morgan from "morgan";
import { Logger } from "../../core/root-logger";

const isProd = process.env.NODE_ENV === "production";
const morganInstance = (options?: object) =>
  morgan("combined", { stream: Logger.stream, ...options });
const httpLogger = isProd
  ? morganInstance({
      skip: function(req, res) {
        return res.statusCode < 400;
      }
    })
  : morganInstance();

export default httpLogger;
