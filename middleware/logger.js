const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");


const logEvent = async (message, logfile) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logfile),
      logItem
    );
  } catch (err) {
    // Logging had an error, so we probably can't log it out correctly... just print it for now
    console.log(err);
  }
};

// Middleware has req, res and optional next
const logger = (req, res, next) => {
  logEvent(
    `${req.method}\t${req.url}\t${req.headers.origin}`,
    "req-" + new Date().toISOString().split("T")[0] + ".log"
  );
  console.log(`${req.method}\t${req.path}`);
  next();
};

module.exports = { logEvent, logger };
