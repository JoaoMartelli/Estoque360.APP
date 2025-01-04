import { HTTPClient } from "./Client";

const UsuarioApi = {
    async CriarUsuario(nome, dataNascimento, email, senha){
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

    async Login(email, senha){
        const usuario = {
            Email: email,
            Senha: senha
        }

        const response = await HTTPClient.post(`Usuario/VerificarLogin`, usuario);
        return response.data;
    }
}

export default UsuarioApi;