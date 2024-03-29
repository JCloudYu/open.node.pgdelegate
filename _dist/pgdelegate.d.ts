/// <reference types="node" />
/**
 *	Author: cheny
 *	Create: 2021-08-10
**/
import type TLS = require('tls');
import postgres = require("pg");
export interface ColumnInfo {
    name: string;
    tableID: number;
    columnID: number;
    dataTypeID: number;
    dataTypeSize: number;
    dataTypeModifier: number;
    format: string;
}
export interface QueryResult<R> {
    command: string;
    rowCount: number;
    oid: number;
    fields: ColumnInfo[];
    rows: R[];
}
export interface KVData {
    [column: string]: any;
}
interface SSLOptions extends TLS.SecureContextOptions, TLS.CommonConnectionOptions {
    ca_file?: string;
    cert_file?: string;
    key_file?: string;
}
export declare type PostgresSessionInitOptions = {
    uri: string;
    ssl?: boolean | SSLOptions;
} & Omit<postgres.PoolConfig, 'user' | 'password' | 'database' | 'port' | 'ssl'>;
declare class PGDelegate {
    static init(conn_info: PostgresSessionInitOptions): Promise<PGDelegate>;
    static format(text: string, values?: ({
        [key: string]: any;
    } | any[])): string;
    get is_connected(): boolean;
    release(): Promise<void>;
    query<R1 extends KVData = any, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<QueryResult<R1>>;
    query<R1 extends KVData, R2 extends KVData, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>]>;
    query<R1 extends KVData, R2 extends KVData, R3 extends KVData, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>]>;
    query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>]>;
    query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>]>;
    query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>]>;
    query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>]>;
    query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>]>;
    query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, R9 extends KVData, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>, QueryResult<R9>]>;
    query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, R9 extends KVData, R10 extends KVData, ValueType extends any[] = any>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>, QueryResult<R9>, QueryResult<R10>]>;
    exec<R1 extends KVData = any, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<QueryResult<R1>>;
    exec<R1 extends KVData, R2 extends KVData, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>]>;
    exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>]>;
    exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>]>;
    exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>]>;
    exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>]>;
    exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>]>;
    exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>]>;
    exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, R9 extends KVData, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>, QueryResult<R9>]>;
    exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, R9 extends KVData, R10 extends KVData, ValueType extends {
        [key: string]: any;
    } = {}>(text: string, values?: ValueType): Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>, QueryResult<R9>, QueryResult<R10>]>;
}
export { PGDelegate };
