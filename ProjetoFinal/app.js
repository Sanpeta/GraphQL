const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`	
	
	type Usuario {
		id: ID!
		nome: String!
		email: String!
		idade: Int
		salario: Float
		vip: Boolean
		teste: String
	}

	type Produto {
		nome: String!
		preco: Float!
		desconto: Float
		precoComDesconto: Float
	}
	
	type Query {
		ola: String
		data: String
		usuarioLogado: Usuario
		produtoEmDestaque: Produto
		numerosMegaSenha: [Int]
	}
`

const resolvers = {
	Usuario: {
		salario(usuario) {
			return usuario.salario
		},
		teste(usuario) {
			return usuario.nome
		}
	},
	Produto: {
		precoComDesconto(produto) {
			if (produto.desconto) {
				return produto.preco * ( 1- produto.desconto)
			}
		}
	},
	Query: {
		ola() {
			return 'Baster Retorna uma String'
		},
		data() {
			const data = new Date
			return `${data}`
		},
		usuarioLogado() {
			return {
				id: 1,
				nome: "Sidnei de Souza Junior",
				email: "Sidnei@hotmail.com",
				idade: 23,
				salario: 1000000,
				vip: true
			}
		},
		produtoEmDestaque() {
			return {
				nome: "Notebook Gamer",
				preco: 5000.00,
				desconto: 0.15
			}
		},
		numerosMegaSenha() {
			//return [4, 8, 13, 27, 33, 52]
			const crescente = (a, b) => a - b
			return Array(6).fill(0).map(n => parseInt(Math.random() *60 + 1)).sort(crescente)

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
