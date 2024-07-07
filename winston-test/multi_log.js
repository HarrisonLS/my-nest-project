import winston from "winston";

// 可以创建多个实例，一个实例负责打印，一个实例负责写入，
// 并且每个 logger 实例有不同的 format、transport、level等配置
winston.loggers.add("console", {
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

winston.loggers.add("file", {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      dirname: "log4",
      filename: "test.log",
      format: winston.format.json(),
    }),
  ],
});

const logger1 = winston.loggers.get("console");

logger1.info("aaaaa");
logger1.error("bbbbb");

const logger2 = winston.loggers.get("file");

logger2.info("xxxx");
logger2.info("yyyy");
