/**
 *	Author: cheny
 *	Create: 2021-08-10
**/
import postgres = require("pg");
import type { QueryResultRow } from "pg";
declare type QRR = QueryResultRow;
export declare type PostgresSessionInitOptions = {
    uri: string;
} & Omit<postgres.PoolConfig, 'user' | 'password' | 'database' | 'port'>;
declare class PGDelegate {
    static init(conn_info: PostgresSessionInitOptions): Promise<PGDelegate>;
    static format(text: string, values?: any[]): string;
    get is_connected(): boolean;
    release(): Promise<void>;
    query<R1 extends QRR = any, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<postgres.QueryResult<R1>>;
    query<R1 extends QRR, R2 extends QRR, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>]>;
    query<R1 extends QRR, R2 extends QRR, R3 extends QRR, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>]>;
    query<R1 extends QRR, R2 extends QRR, R3 extends QRR, R4 extends QRR, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>]>;
    query<R1 extends QRR, R2 extends QRR, R3 extends QRR, R4 extends QRR, R5 extends QRR, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>]>;
    query<R1 extends QRR, R2 extends QRR, R3 extends QRR, R4 extends QRR, R5 extends QRR, R6 extends QRR, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>]>;
    query<R1 extends QRR, R2 extends QRR, R3 extends QRR, R4 extends QRR, R5 extends QRR, R6 extends QRR, R7 extends QRR, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>]>;
    query<R1 extends QRR, R2 extends QRR, R3 extends QRR, R4 extends QRR, R5 extends QRR, R6 extends QRR, R7 extends QRR, R8 extends QRR, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>, postgres.QueryResult<R8>]>;
    query<R1 extends QRR, R2 extends QRR, R3 extends QRR, R4 extends QRR, R5 extends QRR, R6 extends QRR, R7 extends QRR, R8 extends QRR, R9 extends QRR, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>, postgres.QueryResult<R8>, postgres.QueryResult<R9>]>;
    query<R1 extends QRR, R2 extends QRR, R3 extends QRR, R4 extends QRR, R5 extends QRR, R6 extends QRR, R7 extends QRR, R8 extends QRR, R9 extends QRR, R10 extends QRR, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>, postgres.QueryResult<R8>, postgres.QueryResult<R9>, postgres.QueryResult<R10>]>;
}
export default PGDelegate;
