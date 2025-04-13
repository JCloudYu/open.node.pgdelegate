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
export type PostgresSessionInitOptions = {
    uri: string;
    ssl?: boolean | SSLOptions;
} & Omit<postgres.PoolConfig, 'user' | 'password' | 'database' | 'port' | 'ssl'>;
export declare class PGDelegate {
    static setTypeParser(oid: number, parser: (value: string | null) => any): typeof PGDelegate;
    static getTypeParser(oid: number): any;
    static setTypeSerializer(serializer: (value: any) => any): void;
    static getTypeSerializer(): (value: any) => any;
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
export declare enum PGTypes {
    BOOL = 16,
    BYTEA = 17,
    CHAR = 18,
    INT8 = 20,
    INT2 = 21,
    INT4 = 23,
    REGPROC = 24,
    TEXT = 25,
    OID = 26,
    TID = 27,
    XID = 28,
    CID = 29,
    JSON = 114,
    XML = 142,
    PG_NODE_TREE = 194,
    SMGR = 210,
    PATH = 602,
    POLYGON = 604,
    CIDR = 650,
    FLOAT4 = 700,
    FLOAT8 = 701,
    ABSTIME = 702,
    RELTIME = 703,
    TINTERVAL = 704,
    CIRCLE = 718,
    MACADDR8 = 774,
    MONEY = 790,
    MACADDR = 829,
    INET = 869,
    ACLITEM = 1033,
    BPCHAR = 1042,
    VARCHAR = 1043,
    DATE = 1082,
    TIME = 1083,
    TIMESTAMP = 1114,
    TIMESTAMPTZ = 1184,
    INTERVAL = 1186,
    TIMETZ = 1266,
    BIT = 1560,
    VARBIT = 1562,
    NUMERIC = 1700,
    REFCURSOR = 1790,
    REGPROCEDURE = 2202,
    REGOPER = 2203,
    REGOPERATOR = 2204,
    REGCLASS = 2205,
    REGTYPE = 2206,
    UUID = 2950,
    TXID_SNAPSHOT = 2970,
    PG_LSN = 3220,
    PG_NDISTINCT = 3361,
    PG_DEPENDENCIES = 3402,
    TSVECTOR = 3614,
    TSQUERY = 3615,
    GTSVECTOR = 3642,
    REGCONFIG = 3734,
    REGDICTIONARY = 3769,
    JSONB = 3802,
    REGNAMESPACE = 4089,
    REGROLE = 4096
}
export default PGDelegate;
