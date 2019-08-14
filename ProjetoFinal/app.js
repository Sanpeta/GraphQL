const {ApolloServer, gql} = require('apollo-server');
const {importSchema} = require('graphql-import');
const resolvers = require('./resolvers');

const server = new ApolloServer({
	typeDefs: importSchema('./schema/index.graphql'),
	resolvers
})

server.listen(80).then(({url}) => {
	console.log(`Inicializando o Apollo Server em ${url}`);
})
