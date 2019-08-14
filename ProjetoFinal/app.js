const {ApolloServer, gql} = require('apollo-server')

const usuarios = [{
		id: 1,
		nome: "Sidnei de Souza 1",
		email: "sidnei1@Gmail.com",
		idade: 23,
		perfil_id: 1
	},
	{
		id: 2,
		nome: "Sidnei de Souza 2",
		email: "sidnei2@Gmail.com",
		idade: 25,
		perfil_id: 1
	},
	{
		id: 3,
		nome: "Sidnei de Souza 3",
		email: "sidnei3@Gmail.com",
		idade: 26,
		perfil_id: 2
	}
];

const perfis =[{
		id: 1,
		nome: "Comum"
	},
	{
		id: 2,
		nome: "Administrador"
	}
];

const typeDefs = gql`	
	
	type Usuario {
		id: Int!
		nome: String!
		email: String!
		idade: Int
		salario: Float
		vip: Boolean
		teste: String
		perfil: Perfil
	}
	
	type Perfil {
		id: Int
		nome: String
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
		usuarios: [Usuario]
		usuario(id: Int): Usuario
		perfis: [Perfil]
		perfil(id: Int): Perfil
	}
`

const resolvers = {
	Usuario: {
		salario(usuario) {
			return usuario.salario
		},
		teste(usuario) {
			return usuario.nome
		},
		perfil(usuario) {
			const sels = perfis.filter(p => p.id === usuario.perfil_id)
			return sels ? sels[0] : null
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

		},
		usuarios() {
			return usuarios;
		},
		usuario(_, {id}) {
			const selecionados = usuarios.filter(u => u.id === id)
			return selecionados ? selecionados[0] : null
		},
		perfis() {
			return perfis;
		},
		perfil(_, {id}) {
			const perfil = perfis.filter(p => p.id === id)
			return perfil ? perfil[0] : null
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
