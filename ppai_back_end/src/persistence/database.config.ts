import { DataSourceOptions } from "typeorm";
import { ORM_ENTITIES } from "./orm-entities";

export const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5433),
    username: process.env.DB_USER ?? 'ppai',
    password: process.env.DB_PASSWORD ?? 'ppai',
    database: process.env.DB_NAME ?? 'ppai',
    entities: ORM_ENTITIES,
    synchronize: true,
};
