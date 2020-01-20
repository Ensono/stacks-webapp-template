const errorHandler = (err, _, res) => {
  console.log(err)
  res.status(err.status || 500)
  res.send({error: err})
}

export default errorHandler
