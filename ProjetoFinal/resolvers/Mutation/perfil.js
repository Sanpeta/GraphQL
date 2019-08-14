const {perfis, proximoId} = require('../../data/db');
function indicePerfil(filtro) {
    if (!filtro) {
        return -1;
    }
    const {id } = filtro
    if (id) {
        return perfis.findIndex(u => u.id === id);
    }
    return -1;
}

module.exports = {
    //{nome}
    novoPerfil(_, {dados}) {
        //some vai procurar no array se exite o mesmo elemento no array
        const nomeExistente = perfis.some(u => u.nome === dados.nome);

        if (nomeExistente) {
            throw new Error('Nome Existente');
        }

        const novo = {
            id: proximoId(),
            ...dados,
        };

        //push vai adicionar o novo elemento no array
        perfis.push(novo)
        return novo
    },
    excluirPerfil(_, {filtro}) {
        //findIndex, vai porcurar no array se tem o elemento igual em alguma parte do array e retornando o index
        const i = indicePerfil(filtro);
        if (i < 0) {
            return null
        }
        //Splice delete o elemento em qual index e quantos elementos (index, quantos delete)
        const excluidos = perfis.splice(i, 1);
        return excluidos ? excluidos[0] : null;
    },

    alterarPerfil(_, {filtro, dados}) {
        const i = indicePerfil(filtro);
        if (i < 0) {
            return null;
        }
        //aqui estou fazendo uma intersecção entre perfil[i] e args e adicionado tudo na constante perfil
        const perfil = {
            ...perfis[i],
            ...dados
        };

        //estou removendo um elemnto no array e adicionando um novo
        perfis.splice(i, 1, perfil)
        return perfil

    }
};