import { useEffect, useState } from "react";
import Alerta from "../../componentes/Alerta/Alerta";
import GraficoBarra from "../../componentes/GraficoBarra/GraficoBarra";
import Loader from "../../componentes/Loader/Loader";
import { Topbar } from "../../componentes/Topbar/Topbar";
import CategoriaApi from "../../services/CategoriaApi";
import style from "./Relatorios.module.css";

export function Relatorios() {

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');
    const [Dados, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    async function ObterDados() {
        try {
            const lista = await CategoriaApi.ObterProdutosPorCategoriaDoUsuario(localStorage.getItem('id'));
            console.log(lista);
            setDados(lista);
        } catch (error) {

        }
    }

    useEffect(() => {
        setLoading(true);
        ObterDados();
        setLoading(false);
    }, []);

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
                <div className={style.pagina_cabecalho}>
                    <h3>Relatórios</h3>
                </div>
                <h4 className={style.titulo}>Total de produtos por categorias</h4>
                <GraficoBarra dados={Dados} />
            </div>
        </Topbar>
    )
}