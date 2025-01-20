import { useEffect, useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import UsuarioApi from "../../services/UsuarioApi";
import Alert from "../../componentes/Alerta/Alerta";
import Logo from "../../assets/LogoEstoque360.png";
import Loader from "../../componentes/Loader/Loader";
import InputMask from 'react-input-mask';

export function Login() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [cadastro, setCadastro] = useState(false);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 10000);
    };

    function resetar() {
        setNome('');
        setEmail('');
        setDataNascimento('');
        setSenha('');
    }

    async function botaoLogin() {
        setLoading(true);
        try {
            const id = await UsuarioApi.Login(email, senha);
            localStorage.setItem('id', id);
            navigate('/Categorias');
        } catch (error) {
            setMensagemAlerta(`Erro ao tentar logar: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta();
        }
        finally {
            setLoading(false);
            resetar();
        }
    }

    async function botaoCadastro() {
        setLoading(true);
        try {
            await UsuarioApi.CriarUsuario(nome, dataNascimento, email, senha);
            setMensagemAlerta("Usuário cadastrado com sucesso, faça login!");
            setTipoAlerta('success');
            exibirAlerta();
            setCadastro(false);
        } catch (error) {
            setMensagemAlerta(`Erro ao tentar cadastrar: ${error.response.data}`);
            setTipoAlerta('danger');
            exibirAlerta();
        }
        finally {
            setLoading(false);
            resetar();
        }
    }

    useEffect(() => {
        if (localStorage.getItem('id') != null) {
            navigate('/Categorias');
        }
        setMensagemAlerta('');
        setMostrarAlerta(false);
        setTipoAlerta('');
    }, []);

    return (
        <div className={style.conteudo}>
            {loading && <Loader />}
            
            <div className={style.login_container}>
                <img src={Logo} alt="Logo-Estoque360" className={style.logo} />
                <div className={style.login_body}>
                    <h2>{cadastro ? "Cadastrar" : "Entrar"}</h2>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        if (cadastro) {
                            botaoCadastro()
                        } else {
                            botaoLogin()
                        }
                    }}>
                        {cadastro && (
                            <>
                                <Form.Group controlId="formNome" className="mb-3">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control id={style.campos} type="text" placeholder="Digite seu nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="formDataNascimento" className="mb-3">
                                    <Form.Label>Data nascimento</Form.Label>
                                    <Form.Control
                                        id={style.campos}
                                        type="date"
                                        name="dataNascimento"
                                        value={dataNascimento}
                                        onChange={(e) => {
                                            const data = e.target.value;
                                            const anoAtual = new Date().getFullYear();
                                            const anoNascimento = new Date(data).getFullYear();

                                            if (anoNascimento > anoAtual) {
                                                setMensagemAlerta("Data de nascimento inválida.");
                                                setTipoAlerta('danger');
                                                exibirAlerta();
                                                setDataNascimento("");
                                            } else {
                                                setDataNascimento(data);
                                            }
                                        }}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control id={style.campos} type="email" placeholder="Digite seu email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="formSenha" className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control id={style.campos} type="password" placeholder="Digite sua senha" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        </Form.Group>

                        <Button id={style.botao_entrar} variant="primary" type="submit">
                            {cadastro ? "Cadastrar" : "Entrar"}
                        </Button>
                    </Form>
                </div>
                <div className={style.login_footer}>
                    <Button variant="second" onClick={() => { resetar(); setCadastro(!cadastro); }}>
                        {cadastro ? "Já tem uma conta? Faça login" : "Não tem uma conta? Cadastre-se"}
                    </Button>
                </div>
            </div>
            <Alert
                tipo={tipoAlerta}
                mensagem={mensagemAlerta}
                visivel={mostrarAlerta}
                aoFechar={() => setMostrarAlerta(false)}
            />
        </div>
    );
}
