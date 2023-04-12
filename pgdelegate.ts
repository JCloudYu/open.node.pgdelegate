/**
 *	Author: cheny
 *	Create: 2021-08-10
**/
import type TLS = require('tls');
import postgres = require("pg");
import fs = require('fs');
import path = require('path');
import PGFormat = require('pg-format-fix');
import URI = require("./lib/uri.js");




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
};
export interface KVData {[column:string]:any};

interface SSLOptions extends TLS.SecureContextOptions, TLS.CommonConnectionOptions {ca_file?:string; cert_file?:string; key_file?:string};
export type PostgresSessionInitOptions = {uri:string; ssl?:boolean|SSLOptions} & Omit<postgres.PoolConfig, 'user'|'password'|'database'|'port'|'ssl'>;



const BASE_DIR = process.cwd();
type PGDelegatePrivates = { pool:postgres.Pool|null; };
const __PGDelegate:WeakMap<PGDelegate, PGDelegatePrivates> = new WeakMap();
class PGDelegate {
	static async init(conn_info:PostgresSessionInitOptions):Promise<PGDelegate> {
		// @ts-ignore
		const {user:_1, password:_2, host:_3, database:_4, port:_5, ...conn_options} = conn_info;


		const uri_info = new URI(conn_info.uri);
		const uri_path = uri_info.pathname;
		
		let sep = uri_path.indexOf('/', 1);
        const db_name = uri_path.substring(1, sep<=0?uri_path.length:sep);
		const port = parseInt(uri_info.port||'5432');


		if ( typeof conn_options.ssl !== "boolean" && Object(conn_options.ssl) === conn_options.ssl ) {
			const ssl_info = conn_options.ssl!;
			if ( typeof ssl_info.ca_file === "string" ) {
				const ca_path = path.resolve(BASE_DIR, ssl_info.ca_file);
				ssl_info.ca = fs.readFileSync(ca_path).toString('utf8');
				ssl_info.ca_file = undefined;
			}

			if ( typeof ssl_info.cert_file === "string" ) {
				const cert_path = path.resolve(BASE_DIR, ssl_info.cert_file);
				ssl_info.cert = fs.readFileSync(cert_path).toString('utf8');
				ssl_info.cert_file = undefined;
			}

			if ( typeof ssl_info.key_file === "string" ) {
				const key_path = path.resolve(BASE_DIR, ssl_info.key_file);
				ssl_info.key = fs.readFileSync(key_path).toString('utf8');
				ssl_info.key_file = undefined;
			}
		}



		const instance = new PGDelegate();
		const pool = new postgres.Pool({
			user:decodeURIComponent(uri_info.username||''),
			password:decodeURIComponent(uri_info.password||''),
			host:uri_info.hostname!,
			port,
			database:decodeURIComponent(db_name),
			...conn_options
		});
		__PGDelegate.set(instance, {pool});

		
		// Test connection
		(await pool.connect()).release();

		return instance;
	}

	static format(text:string, values:({[key:string]:any}|any[])={}):string {
		if ( Array.isArray(values) ) {
			return PGFormat(text, ...values)
		}
		else 
		if ( Object(values) === values ) {
			const result = ParseVarMap(text, values);
			return PGFormat(result.sql, result.values);
		}
		else {
			throw new TypeError("Given values must be an object or an array!");
		}
	}

	get is_connected():boolean {
		return __PGDelegate.get(this)!.pool !== null;
	}

	async release():Promise<void> {
		await __PGDelegate.get(this)!.pool!.end();
	}

	

	
	async query<R1 extends KVData=any, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<QueryResult<R1>>;
	async query<R1 extends KVData, R2  extends KVData, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>]>;
	async query<R1 extends KVData, R2 extends KVData, R3 extends KVData, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>]>;
	async query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>]>;
	async query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>]>;
	async query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>]>;
	async query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>]>;
	async query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>]>;
	async query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, R9 extends KVData, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>, QueryResult<R9>]>;
	async query<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, R9 extends KVData, R10 extends KVData, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>, QueryResult<R9>, QueryResult<R10>]>;
	async query<ValueType extends any[]=any>(text:string, values?:ValueType):Promise<QueryResult<any>|QueryResult<any>[]> {
		const pool = __PGDelegate.get(this)!.pool;
		if ( !pool ) throw new Error("Postgres connection has been dropped!");



		const inst_client = await pool.connect();
		return await Promise.resolve()
		.then(async()=>{
			if ( values !== undefined ) {
				return await inst_client.query(text, values);
			}
			else {
				return await inst_client.query(text);
			}
		})
		.finally(()=>inst_client.release());
	}

	async exec<R1 extends KVData=any, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<QueryResult<R1>>;
	async exec<R1 extends KVData, R2  extends KVData, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>]>;
	async exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>]>;
	async exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>]>;
	async exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>]>;
	async exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>]>;
	async exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>]>;
	async exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>]>;
	async exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, R9 extends KVData, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>, QueryResult<R9>]>;
	async exec<R1 extends KVData, R2 extends KVData, R3 extends KVData, R4 extends KVData, R5 extends KVData, R6 extends KVData, R7 extends KVData, R8 extends KVData, R9 extends KVData, R10 extends KVData, ValueType extends {[key:string]:any}={}>(text:string, values?:ValueType):Promise<[QueryResult<R1>, QueryResult<R2>, QueryResult<R3>, QueryResult<R4>, QueryResult<R5>, QueryResult<R6>, QueryResult<R7>, QueryResult<R8>, QueryResult<R9>, QueryResult<R10>]>;
	async exec<ValueType extends any[]=any>(text:string, values?:ValueType):Promise<QueryResult<any>|QueryResult<any>[]> {
		const pool = __PGDelegate.get(this)!.pool;
		if ( !pool ) throw new Error("Postgres connection has been dropped!");



		const inst_client = await pool.connect();
		return await Promise.resolve()
		.then(async()=>{
			const result = ParseVarMap(text, values||{});
			const final_sql = PGFormat(result.sql, result.values);
			return await inst_client.query(final_sql);
		})
		.finally(()=>inst_client.release());
	}

	/*
	async transaction(handler:ScopeHandler<postgres.PoolClient>):Promise<void> {
		const pool = __PGDelegate.get(this)!.pool;
		if ( !pool ) throw new Error("Postgres connection has been dropped!");




		const inst_client = await pool.connect();
		await inst_client.query('BEGIN;')
		.then(()=>handler(inst_client))
		.then(()=>inst_client.query('COMMIT;'))
		.catch(async(e)=>{
			await inst_client.query('ROLLBACK')
			return Promise.reject(e);
		})
		.finally(()=>inst_client.release());


		return;
	}
	*/
};

export {PGDelegate};




function ParseVarMap(sql:string, data:{[key:string]:any}) {
	let i=0, parsed = '', values:any[] = [];
	while(i<sql.length) {
		switch(sql[i]) {
			case "\\": {
				const {idx, parts} = EatEscape(sql, i);
				i = idx;
				parsed += parts;
				break;
			}

			case "{": {
				const {idx, key} = EatValue(sql, i);
				const value = data[key];
				if ( value === undefined ) {
					throw new RangeError(`Unable to locate key "${key}" in data map!`);
				}

				values.push(value);
				i = idx;
				parsed += ((value instanceof BigInt)||(typeof value === "bigint")) ? '%s' : '%L';
				break;
			}

			case "[": {
				const {idx, key} = EatColumn(sql, i);
				if ( data[key] === undefined ) {
					throw new RangeError(`Unable to locate key "${key}" in data map!`);
				}

				values.push(data[key]);
				i = idx;
				parsed += '%I';
				break;
			}

			default: {
				parsed += sql[i++];
				break;
			}
		}
	}

	return {sql:parsed, values};
}
function EatEscape(sql:string, idx:number):{parts:string; idx:number} {
	let str = sql.substring(idx, idx+2);
	switch(str) {
		case "\\\\":
			str = "\\";
			break;

		case "\\{":
			str = "{";
			break;
		
		default:
			break;
	}

	return {parts:str, idx:idx+str.length};
}
function EatValue(sql:string, idx:number):{key:string; idx:number} {
	let to = idx;
	while(to < sql.length) {
		if ( sql[to] === "}" ) break;
		to++;
	}

	if ( to === idx+1 ) throw new SyntaxError(`Missing key name near offset ${idx}!`);
	if ( to === sql.length ) throw new SyntaxError(`Missing closing operator '}' near offset ${idx}!`);
	
	return {idx:to+1, key:sql.substring(idx+1, to)};
}
function EatColumn(sql:string, idx:number):{key:string; idx:number} {
	let to = idx;
	while(to < sql.length) {
		if ( sql[to] === "]" ) break;
		to++;
	}

	if ( to === idx+1 ) throw new SyntaxError(`Missing key name near offset ${idx}!`);
	if ( to === sql.length ) throw new SyntaxError(`Missing closing operator ']' near offset ${idx}!`);
	
	return {idx:to+1, key:sql.substring(idx+1, to)};
}