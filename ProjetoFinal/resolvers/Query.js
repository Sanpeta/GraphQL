const {usuarios, perfis} = require('../data/db')

module.exports = {

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