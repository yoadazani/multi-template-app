import supertest, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import CreateServer from '../../../classes/CreateServer';

const Server = new CreateServer()

const app = Server.getApp()


export {
    app,
    Server,
    supertest,
    Test,
    TestAgent
}