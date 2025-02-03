import { HTTPClient } from "./Client";

const UsuarioApi = {
    async CriarUsuario(nome, dataNascimento, email, senha) {
        const usuario = {
            DataNascimento: dataNascimento,
            Nome: nome,
            Email: email,
            Senha: senha
        }

        const response = await HTTPClient.post(`Usuario/adicionar`, usuario);
        console.log(response.data);
        return response.data;
    },

    async Login(email, senha) {
        const usuario = {
            Email: email,
            Senha: senha
        }

        const response = await HTTPClient.post(`Usuario/VerificarLogin`, usuario);
        return response.data;
    },

    async AtualizarInformacoes(id, nome, dataNascimento) {
        const usuario = {
            UsuarioId: id,
            Nome: nome,
            DataNascimento: dataNascimento
        };

        const response = await HTTPClient.put(`Usuario/AtualizarInformacoes`, usuario);
        return response.data;
    },

    async AtualizarFoto(usuarioId, formData) {
        const response = await HTTPClient.put(`Usuario/AtualizarFoto/${usuarioId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    },

    async ObterUsuario(id) {
        const response = await HTTPClient.get(`Usuario/ObterUsuario/${id}`);
        return response.data;
    },

    async RemoverFoto(id) {
        const response = await HTTPClient.delete(`Usuario/RemoverFoto/${id}`);
        return response.data;
    },

    async ObterFoto(id) {
        const response = await HTTPClient.get(`Usuario/ObterFotoPerfil/${id}`, {
            responseType: "blob"
        });
        return response.data;
    }
}

export default UsuarioApi;