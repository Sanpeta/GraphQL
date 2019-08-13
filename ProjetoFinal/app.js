const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
	type Query {
		ola: String
	}
`

const resolvers = {
	Query: {
		ola() {
			return 'Baster Retorna uma String'
		}
	}
}

const server = new ApolloServer({
	typeDefs, 
	resolvers
})

server.listen(80).then(({url}) => {
	console.log("Tete")
})
