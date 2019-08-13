const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
	type Query {
		ola: String
		data: String
	}
`

const resolvers = {
	Query: {
		ola() {
			return 'Baster Retorna uma String'
		},
		data() {
			const data = new Date
			return `${data}`
		}
	}
}

const server = new ApolloServer({
	typeDefs, 
	resolvers
})

server.listen(80).then(({url}) => {
	console.log("Teste")
})
