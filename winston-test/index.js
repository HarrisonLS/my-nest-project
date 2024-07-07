import winston from "winston";
import "winston-daily-rotate-file";

const console = new winston.transports.Console();
const file = new winston.transports.File({ filename: "test.log" });

const logger = winston.createLogger({
  // 打印的日志级别
  level: "debug", // error:0, debug:1, info:2, http:3,verbose:4,debug:5,silly:6

  // 日志格式
  // format: winston.format.simple(),

  // winston.format.json()
  // winston.format.prettyPrint()
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.label({ label: "标签" }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.simple()
    // winston.format.json()
  ),

  // 日志的传输方式
  transports: [
    new winston.transports.Console(),

    // 按 1KB 文件大小分 log
    // new winston.transports.File({
    //   dirname: "log",
    //   filename: "test.log",
    //   maxsize: 1024,
    // }),

    // 按时间分 log
    // new winston.transports.DailyRotateFile({
    //   level: "info",
    //   dirname: "log2",
    //   filename: "test-%DATE%.log",
    //   datePattern: "YYYY-MM-DD-HH-mm",
    //   maxSize: "1k",
    // }),

    // http
    // new winston.transports.Http({
    //   host: "localhost",
    //   port: "3000",
    //   path: "/log",
    // }),
  ],
});

// transport 可以用 add、remove 方法来动态增删
// logger.clear();
// logger.add(console);
// logger.remove(console);
// logger.add(file);

logger.info("test");
logger.error("failed");
logger.debug(6666666666);
