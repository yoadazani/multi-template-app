import {mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import process from "process";
import {copyFile} from "./copyFile.js";
import {Create_gitignore_and_env_files} from "./setup.js";


const CURR_DIR = process.cwd()

export const createDirectoryContent = (srcDirPath, destDirPath) => {
    const files = readdirSync(srcDirPath);


    if (!files) return false

    files.forEach((file) => {
        const originalFilePath = `${srcDirPath}/${file}`;
        const writePath = `${CURR_DIR}/${destDirPath}/${file}`

        const stats = statSync(originalFilePath);

        if (stats.isFile()) {
            const contents = readFileSync(originalFilePath, 'utf8');

            copyFile(writePath, contents)

        } else if (stats.isDirectory()) {
            mkdirSync(writePath);

            // Recursively call createDirectoryContent on the subdirectory
            createDirectoryContent(
                `${srcDirPath}/${file}`,
                `${destDirPath}/${file}`,
            )
        }
    })
}