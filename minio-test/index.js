let Minio = require("minio");

let minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "tvcDjG9g4F90Cpv48Fcj",
  secretKey: "4tet9im748od2rfds4CH5sx5wRSykzQPEdiBR0HH",
});

function put() {
  minioClient.fPutObject(
    "water",
    "hello.png",
    "./smile.png",
    function (err, etag) {
      if (err) return console.error(err);
      console.log("上传成功");
    }
  );
}

put();

const fs = require("fs");

function get() {
  minioClient.getObject("aaa", "hello.png", (err, stream) => {
    if (err) return console.log(err);
    stream.pipe(fs.createWriteStream("./xxx.png"));
  });
}

get();
