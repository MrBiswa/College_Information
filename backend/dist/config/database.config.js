"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../entities/user.entity");
const sample_entity_1 = require("../entities/sample.entity");
const test_template_entity_1 = require("../entities/test-template.entity");
const report_entity_1 = require("../entities/report.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'lab_testing_db',
    entities: [user_entity_1.User, sample_entity_1.Sample, test_template_entity_1.TestTemplate, report_entity_1.Report],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
};
//# sourceMappingURL=database.config.js.map