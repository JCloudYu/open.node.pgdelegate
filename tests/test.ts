import {PGDelegate, PGTypes} from "../pgdelegate.js";

(async()=>{
	const ARGV = process.argv.slice(2);

	const pgsql = await PGDelegate.init({
		uri: ARGV[0]||"postgres://postgres:postgres@127.0.0.1:5432/postgres?sslmode=disable",
	});

	PGDelegate.setTypeParser(PGTypes.NUMERIC, (value:string|null)=>{
		if ( value === null ) return null;
		return parseFloat(value);
	});

	PGDelegate.setTypeParser(PGTypes.INT8, (value:string|null)=>{
		if ( value === null ) return null;
		return BigInt(value);
	});

	PGDelegate.setTypeSerializer((value:any)=>{
		if ( typeof value === 'bigint' ) return value.toString(10);
		return value;
	});

	const {rows:decimal_result} = await pgsql.query("SELECT '1000000003.141692653589793238462643383279'::DECIMAL(36, 18) as v");
	console.log(decimal_result);

	const {rows:bigint_result} = await pgsql.exec("SELECT ({value}::BIGINT * 1000::BIGINT + 807::BIGINT) as v", {value:BigInt('9223372036854775')});
	console.log(bigint_result);

	await pgsql.release();
})();
