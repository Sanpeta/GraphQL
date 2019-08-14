const {usuarios, proximoId} = require('../../data/db');
function indiceUsuario(filtro) {
    if (!filtro) {
        return -1;
    }
    const {id, email} = filtro
    if (id) {
        return usuarios.findIndex(u => u.id === id);
    } else if (email) {
        return usuarios.findIndex(u => u.email === email);
    }
    return -1;
}

module.exports = {
    //{nome, idade, email}
    novoUsuario(_, {dados}) {
        //some vai procurar no array se exite o mesmo elemento no array
        const emailExistente = usuarios.some(u => u.email === dados.email);

        if (emailExistente) {
            throw new Error('Email Existente');
        }

        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }

        //push vai adicionar o novo elemento no array
        usuarios.push(novo)
        return novo
    },
    excluirUsuario(_, {filtro}) {
        //findIndex, vai porcurar no array se tem o elemento igual em alguma parte do array e retornando o index
        const i = indiceUsuario(filtro);
        if (i < 0) {
            return null
        }
        //Splice delete o elemento em qual index e quantos elementos (index, quantos delete)
        const excluidos = usuarios.splice(i, 1);
        return excluidos ? excluidos[0] : null;
    },

    alterarUsuario(_, {filtro, dados}) {
        const i = indiceUsuario(filtro);
        if (i < 0) {
            return null;
        }
        //aqui estou fazendo uma intersecção entre usuario[i] e args e adicionado tudo na constante usuario
        const usuario = {
            ...usuarios[i],
            ...dados
        };

        //estou removendo um elemnto no array e adicionando um novo
        usuarios.splice(i, 1, usuario)
        return usuario

    }
};