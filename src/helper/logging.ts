import fs from "fs/promises";
import path from "path";
import dayjs from "dayjs";

const dayNow = dayjs().get("dates");
const monthNow = dayjs().get("month") + 1;
const fileName = path.join(
  __dirname,
  "../logs",
  `logs-${dayNow}${monthNow}.log`
);
const logging = (msgObj: any) => {
  try {
    console.log("Print logging")
    const msgLog = {
      ...msgObj,
      timeStamp: dayjs(Date.now()).format("DD/MM/YYYY HH:mm:ss"),
    };

    fs.appendFile(fileName, `${JSON.stringify(msgLog)}\n`);
  } catch (error) {
    console.log(error);
  }
};

export default logging;
