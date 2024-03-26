#!/usr/bin/env node

import path from 'path';
import {fileURLToPath} from 'url';
import {existsSync, mkdirSync, readdirSync} from 'fs';
import process from "process";
import inquirer from 'inquirer';

import {createDirectoryContent} from '../utils/createDirContent.js';
import isLoading from "../utils/loading.js";
import {Create_gitignore_and_env_files} from "../utils/setup.js";

const CURR_DIR = process.cwd();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDir = path.resolve(path.join(__dirname, '..', 'projects'));

// Check if the directory exists
if (!existsSync(templatesDir)) {
    console.error(`Directory ${templatesDir} does not exist.`);
    process.exit(1); // Exit the process if the directory does not exist
}

let inProgress = true;
const CHOICES = readdirSync(templatesDir);

const QUESTIONS = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'What project would you like to generate?',
        choices: CHOICES
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Choose a name of your project?',
        validate: (value) => {
            if (!value.length || !(/^([A-Za-z-\-\\_\d])+$/.test(value))) {
                return 'Project name can include only letters, numbers, underscore or hashes.';
            }
            if (existsSync(path.join(CURR_DIR, value))) {
                return `Directory ${value} already exists. Please choose a different name.`;
            }
            return true;
        }
    }
]

const promptForProjectName = async () => {
    return await inquirer.prompt(QUESTIONS)
}

const createProject = (answers) => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];

    const templatePath = `${__dirname}/../projects/${projectChoice}`;

    mkdirSync(`${CURR_DIR}/${projectName}`);

    isLoading(true)

    const done = !createDirectoryContent(`${templatePath}`, `${projectName}`)

    Create_gitignore_and_env_files(CURR_DIR, projectName)

    if (done) {
        setTimeout(() => {
            isLoading(false)

            console.log(`Project ${projectName} created successfully!\n`);
            console.log(`cd ${projectName}`);
            console.log('npm install');
            console.log('npm run dev\n\n');

            console.log('Happy coding!');

            process.exit(0);
        }, 5000);
    }
}


const main = () => {
    promptForProjectName().then(answers => {
        if (existsSync(path.join(CURR_DIR, answers['project-name']))) {
            console.error(`Directory ${answers['project-name']} already exists.`);
            return main(); // Recursively call main to prompt again
        }
        createProject(answers);
    });
}


main()