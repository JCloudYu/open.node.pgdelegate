declare class URI {
	urn:boolean;
	protocol:string;
	origin:string;
	username:string;
	password:string;
	host:string;
	hostname:string;
	port:string;
	pathname:string;
	search:string;
	hash:string;

	constructor(uri:string);
}

export = URI;