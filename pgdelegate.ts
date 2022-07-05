/**
 *	Author: cheny
 *	Create: 2021-08-10
**/
import postgres = require("pg");
import PGFormat = require('pg-format');

import URI = require("./lib/uri.js");

export type PostgresSessionInitOptions = { uri:string; } & Omit<postgres.PoolConfig, 'user'|'password'|'database'|'port'>;


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



		const instance = new PGDelegate();
		const pool = new postgres.Pool({
			user:uri_info.username!,
			password:uri_info.password!,
			host:uri_info.hostname!,
			port,
			database:db_name,
			...conn_options
		});
		__PGDelegate.set(instance, {pool});

		
		// Test connection
		(await pool.connect()).release();

		return instance;
	}

	static format(text:string, values:any[]):string {
		return PGFormat(text, values)
	}

	get is_connected():boolean {
		return __PGDelegate.get(this)!.pool !== null;
	}

	async release():Promise<void> {
		await __PGDelegate.get(this)!.pool!.end();
	}

	

	
	async query<R1=any, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<postgres.QueryResult<R1>>;
	async query<R1, R2, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>]>;
	async query<R1, R2, R3, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>]>;
	async query<R1, R2, R3, R4, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>]>;
	async query<R1, R2, R3, R4, R5, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>]>;
	async query<R1, R2, R3, R4, R5, R6, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>]>;
	async query<R1, R2, R3, R4, R5, R6, R7, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>]>;
	async query<R1, R2, R3, R4, R5, R6, R7, R8, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>, postgres.QueryResult<R8>]>;
	async query<R1, R2, R3, R4, R5, R6, R7, R8, R9, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>, postgres.QueryResult<R8>, postgres.QueryResult<R9>]>;
	async query<R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, ValueType extends any[]=any>(text:string, values?:ValueType):Promise<[postgres.QueryResult<R1>, postgres.QueryResult<R2>, postgres.QueryResult<R3>, postgres.QueryResult<R4>, postgres.QueryResult<R5>, postgres.QueryResult<R6>, postgres.QueryResult<R7>, postgres.QueryResult<R8>, postgres.QueryResult<R9>, postgres.QueryResult<R10>]>;
	async query<ValueType extends any[]=any>(text:string, values?:ValueType):Promise<postgres.QueryResult<any>|postgres.QueryResult<any>[]> {
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

export default PGDelegate;