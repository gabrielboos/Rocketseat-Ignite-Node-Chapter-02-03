
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return await createConnection(
        Object.assign(defaultOptions, {
            host: "database_ignite"
        })
    );
};