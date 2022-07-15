function handleError(err, req, res, next) {
  console.log("inside error",err);
  if (err && err.statusCode) {
    res.status(err.statusCode).json({error:err.message});
    return;
  };
  res.status(503).json({error:err.message ||"internal server error"});
}

module.exports = { handleError };
