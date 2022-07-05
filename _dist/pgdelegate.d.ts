/**
 *	Author: cheny
 *	Create: 2021-08-10
**/
import postgres = require("pg");
export declare type PostgresSessionInitOptions = {
    uri: string;
} & Omit<postgres.PoolConfig, 'user' | 'password' | 'database' | 'port'>;
declare class PGDelegate {
    static init(conn_info: PostgresSessionInitOptions): Promise<PGDelegate>;
    static format(text: string, values: any[]): string;
    get is_connected(): boolean;
    release(): Promise<void>;
    query<R1 = any, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<postgres.QueryResult<R1>>;
    query<R1, R2, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>]>;
    query<R1, R2, R3, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>]>;
    query<R1, R2, R3, R4, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>]>;
    query<R1, R2, R3, R4, R5, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>]>;
    query<R1, R2, R3, R4, R5, R6, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>]>;
    query<R1, R2, R3, R4, R5, R6, R7, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>]>;
    query<R1, R2, R3, R4, R5, R6, R7, R8, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>, postgres.QueryResult<R8>]>;
    query<R1, R2, R3, R4, R5, R6, R7, R8, R9, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>, postgres.QueryResult<R8>, postgres.QueryResult<R9>]>;
    query<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>, postgres.QueryResult<R8>, postgres.QueryResult<R9>, postgres.QueryResult<R10>]>;
}
export default PGDelegate;
