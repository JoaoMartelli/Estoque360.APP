import { Table, useAccordionButton } from "react-bootstrap";
import { Topbar } from "../../componentes/Topbar/Topbar";
import style from "./Categorias.module.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import CategoriaApi from "../../services/CategoriaApi";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Loader from "../../componentes/Loader/Loader";
import { Link } from "react-router-dom";
import { SearchBar } from "../../componentes/SearchBar/SearchBar";
import Alerta from "../../componentes/Alerta/Alerta";

export function Categorias() {
    const [search, setSearch] = useState('');

    const [categorias, setCategorias] = useState([]);
    const [nome, setNome] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [usuarioId, setUsuarioId] = useState(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [adicionar, setAdicionar] = useState(false);
    const [remover, setRemover] = useState(false);
    const [editar, setEditar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoriaId, setCategoriaId] = useState(null);

    const handleFecharModal = () => {
        setMostrarModal(false);
        setCategoriaSelecionada(null);
        setRemover(false);
        setAdicionar(false);
        setEditar(false);
        setNome(null);
        setCategoriaId(null);
    };

    function modalEditar(categoria) {
        setLoading(true);
        setNome(categoria.nome);
        setCategoriaId(categoria.id);
        setEditar(true);
        setMostrarModal(true);
        setLoading(false);
    }

    const exibirAlerta = () => {
        setMostrarAlerta(true);
        setTimeout(() => {
            setMostrarAlerta(false);
        }, 10000);
    };

    function modalExcluir(categoria) {
        setLoading(true);
        setCategoriaSelecionada(categoria);
        setRemover(true);
        setMostrarModal(true);
        setLoading(false);
    }

    function modalAdicionar() {
        setLoading(true);
        setAdicionar(true);
        setNome(null);
        setMostrarModal(true);
        setLoading(false);
    }

    const categoriasFiltradas = categorias.filter(categorias =>
        categorias.nome?.toLowerCase().includes(search.toLowerCase())
    );

    async function excluirCategoria() {
        try {
            setLoading(true);
            await CategoriaApi.ExcluirCategoria(categoriaSelecionada.id);
            obterCategorias(usuarioId);
            setMensagemAlerta(`Categoria excluida com sucesso!`);
            setTipoAlerta('success');
        }
        catch (error) {
            setMensagemAlerta(`Erro ao excluir a categoria: ${error.response.data}`);
            setTipoAlerta('danger');
        }
        finally {
            handleFecharModal();
            setLoading(false);
            exibirAlerta();
        }
    }

    async function editarCategoria() {
        try {
            setLoading(true);
            await CategoriaApi.EditarCategoria(categoriaId, nome);
            obterCategorias(usuarioId)
            setMensagemAlerta(`Categoria atualizada com sucesso!`);
            setTipoAlerta('success');
        }
        catch (error) {
            setMensagemAlerta(`Erro ao atualizar a categoria: ${error.response.data}`);
            setTipoAlerta('danger');
        }
        finally {
            handleFecharModal();
            setLoading(false);
            exibirAlerta();
        }
    }

    async function adicionarCategoria() {
        try {
            setLoading(true);
            await CategoriaApi.AdicionarCategoria(nome, usuarioId);
            obterCategorias(usuarioId)
            setMensagemAlerta(`Categoria adicionada com sucesso!`);
            setTipoAlerta('success');
        }
        catch (error) {
            setMensagemAlerta(`Erro ao adicionar a categoria: ${error.response.data}`);
            setTipoAlerta('danger');
        }
        finally {
            handleFecharModal();
            setLoading(false);
            exibirAlerta();
        }
    }

    async function obterCategorias(id) {
        try {
            const lista = await CategoriaApi.ObterCategorias(id, true);
            handleFecharModal();
            setCategorias(lista);
        }
        catch (error) {
            console.log("Erro ao carregar as categorias", error);
        }
    }

    useEffect(() => {
        setLoading(true);
        const id = localStorage.getItem('id');
        setUsuarioId(id);
        obterCategorias(id);
        setLoading(false);
    }, [])

    return (
        <Topbar>
            <div className={style.conteudo}>
                <Alerta
                    tipo={tipoAlerta}
                    mensagem={mensagemAlerta}
                    visivel={mostrarAlerta}
                    aoFechar={() => setMostrarAlerta(false)}
                />
                {loading && <Loader />}

                <Modal show={mostrarModal} onHide={handleFecharModal}>
                    {adicionar ? <>
                        <Modal.Header closeButton>
                            <Modal.Title>Adicionar categoria</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form.Group className="mb-3">
                                <Form.Label id={style.label}>Nome</Form.Label>

                                <Form.Control id={style.formulario} type="text" placeholder="Nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="danger" onClick={handleFecharModal}>
                                Cancelar
                            </Button>

                            <Button variant="success" onClick={adicionarCategoria}>
                                Adicionar
                            </Button>
                        </Modal.Footer>
                    </>
                        : null}
                    {editar ? <>
                        <Modal.Header closeButton>
                            <Modal.Title>Atualizar categoria</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label id={style.label}>Nome</Form.Label>
                                <Form.Control id={style.formulario} type="text" placeholder="Nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="danger" onClick={handleFecharModal}>
                                Cancelar
                            </Button>

                            <Button variant="success" onClick={editarCategoria}>
                                Atualizar
                            </Button>
                        </Modal.Footer>
                    </>
                        : null}
                    {remover ? <>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Tem certeza que deseja remover a categoria {categoriaSelecionada?.nome}?
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleFecharModal}>
                                Cancelar
                            </Button>

                            <Button variant="danger" onClick={excluirCategoria}>
                                Deletar
                            </Button>
                        </Modal.Footer>
                    </>
                        : null}
                </Modal>
                <div className={style.pagina_cabecalho}>
                    <h3>Categorias</h3>
                    <Link onClick={modalAdicionar} className={style.botao_novo}>+ Novo</Link>
                </div>
                <div className={style.pesquisa}>
                    <SearchBar
                        placeholder="Nome"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className={style.tabela}>
                    <Table responsive className={style.table}>
                        <thead className={style.tabela_header}>
                            <tr>
                                <th id={style.campos}>Nome</th>
                                <th id={style.campos}>Ações</th>
                            </tr>
                        </thead>
                        <tbody className={style.tabela_body}>
                            {categoriasFiltradas.map((x) => (
                                <tr key={x.id}>
                                    <td id={style.linha}><Link to='/Produtos' state={x.id} id={style.produtos}>
                                        {x.nome}
                                    </Link></td>
                                    <td id={style.linha}>
                                        <button onClick={() => { setCategoriaSelecionada(x); modalEditar(x) }} className={style.botao_editar}>
                                            <MdEdit />
                                        </button>
                                        <button onClick={() => { setCategoriaSelecionada(x); modalExcluir(x) }} className={style.botao_excluir}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td id={style.tabela_footer} colSpan="2">
                                    Total de categorias: {categoriasFiltradas.length}
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </div>
            </div>
        </Topbar>
    );
}