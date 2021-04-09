// import * from 'moment'

declare module '*.json' {
	const value: any;
	export default value;
}

interface WSRequest {
	requestID: string;
	params: unknown[];
}

interface WSResponse {
	responseID: string;
	payload: unknown;
}

interface TIS2Module {
	layers: any[] | null;
	[key: string]: any;
}
