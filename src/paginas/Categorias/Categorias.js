import { Table, useAccordionButton } from "react-bootstrap";
import { Topbar } from "../../componentes/Topbar/Topbar";
import style from "./Categorias.module.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import CategoriaApi from "../../services/CategoriaApi";
import Form from "react-bootstrap/Form";

export function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [usuarioId, setUsuarioId] = useState(null);
    const [novaCategoria, setNovaCategoria] = useState(true);
    const [mensagem, setMensagem] = useState(null);
    const [aviso, setAviso] = useState(null);
    const [nome, setNome] = useState(null);

    function botaoEditar(id) {
        setCategoriaSelecionada(id);
        setNovaCategoria(false);
    }

    function botaoCancelar() {
        setNovaCategoria(true);
        setCategoriaSelecionada(null);
    }

    function botaoExcluir(id) {

    }

    function editarCategoria() {

    }

    function adicionarCategoria() {

    }

    async function obterCategorias(id) {
        try {
            const lista = await CategoriaApi.ObterCategorias(id, true);
            setCategorias(lista);
        }
        catch (error) {
            console.log("Erro ao carregar as categorias", error);
        }
    }

    useEffect(() => {
        const id = localStorage.getItem('id');
        setNovaCategoria(true);
        setUsuarioId(id);
        obterCategorias(id);
    }, [])

    return (
        <Topbar>
            <div className={style.conteudo}>
                <div className={style.tabela}>
                    <Table responsive className={style.table}>
                        <thead className={style.tabela_header}>
                            <tr>
                                <th>Categorias</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody className={style.tabela_body}>
                            {categorias.map((x) => (
                                <tr key={x.id}>
                                    <td>{x.nome}</td>
                                    {/* Adicionar um <Link> no nome acima após finalizar a página de categorias */}
                                    <td>
                                        <button onClick={() => botaoEditar(x.id)} className={style.botao_editar}>
                                            <MdEdit />
                                        </button>
                                        <button onClick={() => botaoExcluir(x.id)} className={style.botao_excluir}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <div className={style.nova_categoria}>
                    <div className={style.categoria_header}>
                        <h3>{novaCategoria ? "Nova Categoria" : "Editar Categoria"}</h3>
                    </div>
                    <div className={style.categoria_body}>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            if (novaCategoria) {
                                adicionarCategoria();
                            }
                            else {
                                editarCategoria();
                            }
                        }} >
                            <Form.Group controlId="formNome" className="mb-3">
                                <Form.Control type="text" placeholder="Nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className={style.categoria_footer}>

                    </div>
                </div>
            </div>
        </Topbar>
    );
}