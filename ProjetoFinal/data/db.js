const usuarios = [{
        id: 1,
        nome: "Sidnei de Souza 1",
        email: "sidnei1@Gmail.com",
        idade: 23,
        perfil_id: 1,
        status: 'BLOQUEADO'
    },
    {
        id: 2,
        nome: "Sidnei de Souza 2",
        email: "sidnei2@Gmail.com",
        idade: 25,
        perfil_id: 1,
        status: 'INATIVO'
    },
    {
        id: 3,
        nome: "Sidnei de Souza 3",
        email: "sidnei3@Gmail.com",
        idade: 26,
        perfil_id: 2,
        status: 'ATIVO'
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

module.exports = {usuarios, perfis}