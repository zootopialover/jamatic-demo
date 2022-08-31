import {ApolloServer} from "apollo-server-lambda";
import {schema} from "./schema";
import {resolvers} from "./resolvers";


const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    formatError: error => {
		return error;
	},
	formatResponse: response => {
		return response;
	},
	context:  ({event,context}) => ({
		headers: event.headers,
		functionName: context.functionName, 
		event,
	    context
	}),
	playground: {
		endpoint: '/dev/graphql'
	}
});

exports.graphqlHandler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
	const handler = server.createHandler({
        cors: {
            origin: "*",
            credentials:true,
            methods:["POST","GET"],
            allowedHeaders: ["Content-Type", "Origin", "Accept"]
        }
    });
    return handler(event, context, callback);
};
