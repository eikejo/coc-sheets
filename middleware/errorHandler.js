const { logEvent } = require("./logger");

// override default error handler
const errorHandler = (err, req, res, next) => {
  logEvent(
    `${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "error-" + new Date().toISOString().split("T")[0] + ".log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // Internal Server Error

  res.status = status;
  res.json({ message: err.message });
};

module.exports = errorHandler;
