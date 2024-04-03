import {existsSync, writeFileSync} from 'fs';
import path from "path";

const gitignoreContent = `
.idea

# Node specific
node_modules/
npm-debug.log

# Logs
/logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
/coverage/

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html) build/Release
/build/

# Dependency directories
/node_modules/
jspm_packages/

# TypeScript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test
.env.production
.env.development

# parcel-bundler cache (https://parceljs.org/)
.cache

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
`;

const envContent = `
# Example .env file
DATABASE_URL='file:./dev.db'

JWT_SECRET="4210c5f8d98dfbc1930807566e75f4f00915937732c0f04a26f0e3d770caed0e064789607e0fc5b5a76acaf52bc8d82c50a8eb9d3c54c057bd509da469d24c1e"

# Email Credentials replace with your own email credentials
EMAIL_USER=root
EMAIL_PASS=s1mpl3
`;

export const Create_gitignore_and_env_files = (currDir, destDirPath) => {
    const gitignorePath = path.join(currDir, destDirPath, '.gitignore');
    const envPath = path.join(currDir, destDirPath, '.env');

    if (!existsSync(gitignorePath)) {
        writeFileSync(gitignorePath, gitignoreContent);
    }

    if (!existsSync(envPath)) {
        writeFileSync(envPath, envContent);
    }

}