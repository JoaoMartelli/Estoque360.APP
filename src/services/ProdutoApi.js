import { HTTPClient } from "./Client";

const ProdutoApi = {
    async ObterProdutos(id, ativo){

        const response = await HTTPClient.get(`Produto/Listar/${id}?ativo=${ativo}`,);
        return response.data;
    },

    async ObterProdutosPorUsuarioId(usuarioId){

        const response = await HTTPClient.get(`Produto/ObterPorUsuarioId/${usuarioId}`,);
        return response.data;
    },

    async AdicionarProduto(categoriaId, nome, preco, quantidade){
        const Produto = {
            CategoriaId: categoriaId,
            Nome: nome,
            Preco: preco,
            Quantidade: quantidade
        }

        const response = await HTTPClient.post(`Produto/Adicionar`, Produto);
        return response.data;
    },

    async EditarProduto(id, nome, preco, quantidade){
        const Produto = {
            ProdutoId: id,
            Nome: nome,
            Preco: preco,
            Quantidade: quantidade
        }

        const response = await HTTPClient.put(`Produto/Atualizar`, Produto);
        return response.data;
    },

    async ExcluirProduto(id){
        const response = await HTTPClient.delete(`Produto/Remover/${id}`);
        return response.data;
    }
}

export default ProdutoApi;