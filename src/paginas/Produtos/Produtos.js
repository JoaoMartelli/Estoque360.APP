import { Table, useAccordionButton } from "react-bootstrap";
import { Topbar } from "../../componentes/Topbar/Topbar";
import style from "./Produtos.module.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import ProdutoApi from "../../services/ProdutoApi";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Loader from "../../componentes/Loader/Loader";
import Alert from "../../componentes/Alerta/Alerta";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Produtos() {
    const location = useLocation();

    const [id] = useState(location.state);
    const [preco, setPreco] = useState(null);
    const [quantidade, setQuantidade] = useState(null);
    const [Produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState(null);
    const [ProdutoSelecionada, setProdutoSelecionada] = useState(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [adicionar, setAdicionar] = useState(false);
    const [remover, setRemover] = useState(false);
    const [editar, setEditar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ProdutoId, setProdutoId] = useState(null);

    const handleFecharModal = () => {
        setMostrarModal(false);
        setProdutoSelecionada(null);
        setRemover(false);
        setAdicionar(false);
        setEditar(false);
        setNome(null);
        setProdutoId(null);
        setPreco(null);
        setQuantidade(null);
    };

    function modalEditar(Produto) {
        setLoading(true);
        setQuantidade(Produto.quantidade);
        setPreco(Produto.preco);
        setNome(Produto.nome);
        setProdutoId(Produto.id);
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

    function modalExcluir(Produto) {
        setLoading(true);
        setProdutoSelecionada(Produto);
        setRemover(true);
        setMostrarModal(true);
        setLoading(false);
    }

    function modalAdicionar() {
        setLoading(true);
        setAdicionar(true);
        setNome(null);
        setPreco(null);
        setQuantidade(null);
        setMostrarModal(true);
        setLoading(false);
    }

    async function excluirProduto() {
        try {
            setLoading(true);
            await ProdutoApi.ExcluirProduto(ProdutoSelecionada.id);
            obterProdutos(id);
            setMensagemAlerta(`Produto excluido com sucesso!`);
            setTipoAlerta('success');
        }
        catch (error) {
            setMensagemAlerta(`Erro ao excluir o Produto: ${error.response.data}`);
            setTipoAlerta('danger');
        }
        finally {
            handleFecharModal();
            setLoading(false);
            exibirAlerta();
        }
    }

    async function editarProduto() {
        try {
            setLoading(true);
            await ProdutoApi.EditarProduto(ProdutoId, nome, preco, quantidade);
            obterProdutos(id)
            setMensagemAlerta(`Produto atualizado com sucesso!`);
            setTipoAlerta('success');
        }
        catch (error) {
            setMensagemAlerta(`Erro ao atualizar o Produto: ${error.response.data}`);
            setTipoAlerta('danger');
        }
        finally {
            handleFecharModal();
            setLoading(false);
            exibirAlerta();
        }
    }

    async function adicionarProduto() {
        try {
            setLoading(true);
            await ProdutoApi.AdicionarProduto(id, nome, preco, quantidade);
            obterProdutos(id)
            setMensagemAlerta(`Produto adicionado com sucesso!`);
            setTipoAlerta('success');
        }
        catch (error) {
            setMensagemAlerta(`Erro ao adicionar o Produto: ${error.response.data}`);
            setTipoAlerta('danger');
        }
        finally {
            handleFecharModal();
            setLoading(false);
            exibirAlerta();
        }
    }

    async function obterProdutos(id) {
        try {
            const lista = await ProdutoApi.ObterProdutos(id, true);
            handleFecharModal();
            setProdutos(lista);
        }
        catch (error) {
            console.log("Erro ao carregar os Produtos", error);
        }
    }

    useEffect(() => {
        setLoading(true);
        obterProdutos(id);
        setLoading(false);
    }, [id])

    return (
        <Topbar>
            <div className={style.conteudo}>
                <Alert
                    tipo={tipoAlerta}
                    mensagem={mensagemAlerta}
                    visivel={mostrarAlerta}
                    aoFechar={() => setMostrarAlerta(false)}
                />
                {loading && <Loader />}

                <Modal show={mostrarModal} onHide={handleFecharModal}>
                    {adicionar ? <>
                        <Modal.Header closeButton>
                            <Modal.Title>Adicionar Produto</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Group controlId="formNome" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Nome"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formQuantidade" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Quantidade"
                                    name="quantidade"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(parseInt(e.target.value, 10))}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPreco" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Preço"
                                    name="preco"
                                    value={preco}
                                    onChange={(e) => setPreco(parseFloat(e.target.value))}
                                    step="0.01"
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="danger" onClick={handleFecharModal}>
                                Cancelar
                            </Button>

                            <Button variant="success" onClick={adicionarProduto}>
                                Adicionar
                            </Button>
                        </Modal.Footer>
                    </>
                        : null}
                    {editar ? <>
                        <Modal.Header closeButton>
                            <Modal.Title>Atualizar Produto</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Group controlId="formNome" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Nome"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formQuantidade" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Quantidade"
                                    name="quantidade"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(parseInt(e.target.value, 10))}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPreco" className="mb-3">
                                <Form.Control
                                    type="number"
                                    placeholder="Preço"
                                    name="preco"
                                    value={preco}
                                    onChange={(e) => setPreco(parseFloat(e.target.value))}
                                    step="0.01"
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="danger" onClick={handleFecharModal}>
                                Cancelar
                            </Button>

                            <Button variant="success" onClick={editarProduto}>
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
                            Tem certeza que deseja remover o Produto {ProdutoSelecionada?.nome}?
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleFecharModal}>
                                Cancelar
                            </Button>

                            <Button variant="danger" onClick={excluirProduto}>
                                Deletar
                            </Button>
                        </Modal.Footer>
                    </>
                        : null}
                </Modal>
                <div className={style.pagina_cabecalho}>
                    <h3>Produtos</h3>
                    <Link onClick={modalAdicionar} className={style.botao_novo}>+ Novo</Link>
                </div>

                <div className={style.tabela}>
                    <Table responsive className={style.table}>
                        <thead className={style.tabela_header}>
                            <tr>
                                <th id={style.campos}>Produtos</th>
                                <th id={style.campos}>Preço</th>
                                <th id={style.campos}>Quantidade</th>
                                <th id={style.campos}>Ações</th>
                            </tr>
                        </thead>
                        <tbody className={style.tabela_body}>
                            {Produtos.map((x) => (
                                <tr key={x.id}>
                                    <td id={style.linha}>{x.nome}</td>
                                    <td id={style.linha}>{x.preco}</td>
                                    <td id={style.linha}>{x.quantidade}</td>
                                    <td id={style.linha}>
                                        <button onClick={() => { setProdutoSelecionada(x); modalEditar(x) }} className={style.botao_editar}>
                                            <MdEdit />
                                        </button>
                                        <button onClick={() => { setProdutoSelecionada(x); modalExcluir(x) }} className={style.botao_excluir}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Topbar>
    );
}