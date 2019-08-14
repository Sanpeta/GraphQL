const {usuarios, proximoId} = require('../data/db');

module.exports = {
    //{nome, idade, email}
    novoUsuario(_, args) {
        //some vai procurar no array se exite o mesmo elemento no array
        const emailExistente = usuarios.some(u => u.email === args.email);

        if (emailExistente) {
            throw new Error('Email Existente');
        }

        const novo = {
            id: proximoId(),
            ...args,
            perfil_id: 1,
            status: 'ATIVO'
        }

        //push vai adicionar o novo elemento no array
        usuarios.push(novo)
        return novo
    },
    excluirUsuario(_, {id}) {
        //findIndex, vai porcurar no array se tem o elemento igual em alguma parte do array e retornando o index
        const i = usuarios.findIndex(u => u.id === id)
        if (i < 0) {
            return null
        }
        //Splice delete o elemento em qual index e quantos elementos (index, quantos delete)
        const excluidos = usuarios.splice(i, 1);
        return excluidos ? excluidos[0] : null;
    },

    alterarUsuario(_, args) {
        const i = usuarios.findIndex(u => u.id === args.id);
        if (i < 0) {
            return null;
        }
        //aqui estou fazendo uma intersecção entre usuario[i] e args e adicionado tudo na constante usuario
        const usuario = {
            ...usuarios[i],
            ...args
        };

        //estou removendo um elemnto no array e adicionando um novo
        usuarios.splice(i, 1, usuario)
        return usuario

    }
};