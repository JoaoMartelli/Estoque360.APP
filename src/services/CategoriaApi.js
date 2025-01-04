import { HTTPClient } from "./Client";

const CategoriaApi = {
    async ObterCategorias(usuarioId, ativo){

        const response = await HTTPClient.get(`Categoria/ObterCategorias/${usuarioId}?ativo=${ativo}`,);
        return response.data;
    },

    async AdicionarCategoria(nome, id){
        const categoria = {
            Nome: nome,
            UsuarioId: id
        }

        const response = await HTTPClient.post(`Categoria/Adicionar`, categoria);
        return response.data;
    },

    async EditarCategoria(nomeAntigo, nomeNovo){
        const categoria = {
            NomeAntigo: nomeAntigo,
            NovoNome: nomeNovo
        }

        const response = await HTTPClient.put(`Categoria/Atualizar`, categoria);
        return response.data;
    },

    async ExcluirCategoria(categoriaId){
        const response = await HTTPClient.delete(`Categoria/Deletar/${categoriaId}`);
        return response.data;
    }
}

export default CategoriaApi;