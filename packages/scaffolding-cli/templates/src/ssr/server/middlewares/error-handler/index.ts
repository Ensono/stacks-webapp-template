import logger from '../../core/root-logger'
const errorHandler = (err, req, res) => {
  logger.error(err)
  res.status(err.status || 500)
  res.send({error: err})
}

export default errorHandler
