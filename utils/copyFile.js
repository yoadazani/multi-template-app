import {writeFileSync} from "fs";

export const copyFile = (writePath, contents) => {
    writeFileSync(writePath, contents, 'utf8');
}