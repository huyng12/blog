import { datetimeFormatter } from "./fomatter";

const datetime = (d: string) => datetimeFormatter.format(new Date(d));

const format = { datetime };

export default format;
