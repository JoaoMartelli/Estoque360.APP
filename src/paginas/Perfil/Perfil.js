import { useState, useEffect } from "react";
import { Topbar } from "../../componentes/Topbar/Topbar";
import UsuarioApi from "../../services/UsuarioApi";
import style from "./Perfil.module.css";
import Alerta from "../../componentes/Alerta/Alerta";
import Loader from "../../componentes/Loader/Loader";
import SemFoto from "../../assets/SemFoto.jpg";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

export function Perfil() {
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [novoNome, setNovoNome] = useState('');
    const [novaDataNascimento, setNovaDataNascimento] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');
    const [loading, setLoading] = useState(false);
    const [mostrarModalFoto, setMostrarModalFoto] = useState(false);
    const [mostrarModalConfirmacao, setMostrarModalConfirmacao] = useState(false);
    const [mostrarModalLogout, setMostrarModalLogout] = useState(false);
    const [mostrarModalEditarPerfil, setMostrarModalEditarPerfil] = useState(false);
    const id = localStorage.getItem('id');

    async function ObterPerfil() {
        try {
            setLoading(true);
            const usuario = await UsuarioApi.ObterUsuario(id);
            setEmail(usuario.email);
            setNome(usuario.nome);
            const dataFormatada = new Date(usuario.dataNascimento).toLocaleDateString('pt-BR');
            setDataNascimento(dataFormatada);
        } catch (error) {
            console.log(`Erro ao carregar o perfil ${error.response.data}`);
        } finally {
            setLoading(false);
        }
    }

    async function ObterFoto() {
        try {
            const blob = await UsuarioApi.ObterFoto(id);
            if (blob && blob.size > 0) {
                setFotoPerfil(URL.createObjectURL(blob));
            } else {
                setFotoPerfil(null);
            }
        } catch (error) {
            setFotoPerfil(null);
        }
    }

    async function atualizarFoto(e) {
        const foto = e.target.files[0];
        if (!foto) return;

        const formData = new FormData();
        formData.append("fotoPerfil", foto);

        try {
            setLoading(true);
            await UsuarioApi.AtualizarFoto(id, formData);
            ObterFoto();
            setMensagemAlerta("Foto de perfil atualizada com sucesso!");
            setTipoAlerta("success");
        } catch (error) {
            setMensagemAlerta(`Erro ao atualizar o perfil ${error.response.data}`);
            setTipoAlerta("danger");
        } finally {
            setLoading(false);
            setMostrarModalFoto(false);
            exibirAlerta();
        }
    }

    async function removerFoto() {
        try {
            setLoading(true);
            await UsuarioApi.RemoverFoto(id);
            setFotoPerfil(null);
            setMensagemAlerta("Foto de perfil removida com sucesso!");
            setTipoAlerta("success");
        } catch (error) {
            setMensagemAlerta(`Erro ao atualizar o perfil ${error.response.data}`);
            setTipoAlerta("danger");
        } finally {
            setLoading(false);
            setMostrarModalConfirmacao(false);
            exibirAlerta();
        }
    }

    async function editarPerfil() {
        try {
            setLoading(true);
            const dataISO = new Date(`${novaDataNascimento}T00:00:00.000Z`).toISOString();
            console.log(dataISO);
            await UsuarioApi.AtualizarInformacoes(id, novoNome, dataISO);
            setMensagemAlerta("Perfil atualizado com sucesso!");
            setTipoAlerta("success");
        } catch (error) {
            const mensagemErro = error.response?.data || "Erro desconhecido.";

            setMensagemAlerta(`Erro ao atualizar o perfil ${mensagemErro}`);
            setTipoAlerta("danger");
        } finally {
            ObterPerfil();
            setLoading(false);
            setMostrarModalEditarPerfil(false);
            exibirAlerta();
        }
    }

    function deslogar() {
        localStorage.removeItem('id');
        window.location.reload();
    }

    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 10000);
    };

    useEffect(() => {
        ObterPerfil();
        ObterFoto();
    }, [id]);

    return (
        <Topbar>
            <div className={style.conteudo}>
                <Alerta tipo={tipoAlerta} mensagem={mensagemAlerta} visivel={mostrarAlerta} aoFechar={() => setMostrarAlerta(false)} />
                {loading && <Loader />}

                <div className={style.pagina_cabecalho}>
                    <h3>Perfil</h3>
                    <Link className={style.botao_novo} onClick={() => {setMostrarModalEditarPerfil(true); setNovaDataNascimento(dataNascimento); setNovoNome(nome);}}>Editar Perfil</Link>
                </div>

                <div className={style.perfil_conteudo}>
                    <div className={style.foto_perfil}>
                        <img src={fotoPerfil ? fotoPerfil : SemFoto} alt="Foto de perfil" className={style.foto_perfil_imagem} />
                        <Link className={style.editar_foto} onClick={() => setMostrarModalFoto(true)}>Editar Foto</Link>
                        <Link className={style.remover_foto} onClick={() => setMostrarModalConfirmacao(true)}>Remover Foto</Link>
                    </div>

                    <div className={style.dados_perfil}>
                        <p><strong>Nome:</strong> {nome}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Data de Nascimento:</strong> {dataNascimento}</p>
                    </div>
                </div>
                <div className={style.rodape}>
                    <Link variant="danger" className={style.botao_sair} onClick={() => setMostrarModalLogout(true)}>
                        <MdLogout /> Desconectar</Link>
                </div>
            </div>

            <Modal show={mostrarModalEditarPerfil} onHide={() => setMostrarModalEditarPerfil(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome"
                            value={novoNome}
                            onChange={(e) => setNovoNome(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            value={novaDataNascimento.split('/').reverse().join('-')}
                            onChange={(e) => setNovaDataNascimento(e.target.value.split('-').reverse().join('/'))}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrarModalEditarPerfil(false)}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={editarPerfil}>
                        Atualizar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarModalFoto} onHide={() => setMostrarModalFoto(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Foto</Modal.Title>
                </Modal.Header>
                <Modal.Body className={style.modal_body}>
                    <img src={fotoPerfil ? fotoPerfil : SemFoto} alt="Foto de perfil" className={style.foto_perfil_imagem} />
                    <Form.Control type="file" onChange={atualizarFoto} />
                </Modal.Body>
            </Modal>

            <Modal show={mostrarModalConfirmacao} onHide={() => setMostrarModalConfirmacao(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Remoção</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja remover sua foto de perfil?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrarModalConfirmacao(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={removerFoto}>Remover</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={mostrarModalLogout} onHide={() => setMostrarModalLogout(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Saída</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja sair do sistema?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setMostrarModalLogout(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={deslogar}>Sair</Button>
                </Modal.Footer>
            </Modal>
        </Topbar>
    );
}