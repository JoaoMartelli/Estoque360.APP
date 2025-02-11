import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import Logo from "../../assets/LogoBrancoEstoque360.png";
import style from "./Topbar.module.css";
import { useEffect, useState } from "react";
import { MdLogout } from 'react-icons/md';
import UsuarioApi from "../../services/UsuarioApi";
import SemFoto from "../../assets/SemFoto.jpg";

export function Topbar({ children }) {

    const [fotoPerfil, setFotoPerfil] = useState(null);

    useEffect(() => {
        ObterFoto()
    }, []);

    async function ObterFoto() {
        try {
            const blob = await UsuarioApi.ObterFoto(localStorage.getItem('id'));
            if (blob && blob.size > 0) {
                const imageUrl = URL.createObjectURL(blob);
                setFotoPerfil(imageUrl);
            } else {
                setFotoPerfil(null);
            }
        } catch (error) {
            setFotoPerfil(null);
        }
    }

    return (
        <div>
            <div className={style.topbar_conteudo}>
                <div className={style.topbar_corpo}>
                    <a href="/home"><img src={Logo} alt="Logo-Estoque360" className={style.logo} />
                    </a>

                    <Link to="/Categorias" className={style.botao_categorias}>
                        <h2>Categorias</h2>
                    </Link>
                    <Link to="/Produtos" className={style.botao_categorias}>
                        <h2>Produtos</h2>
                    </Link>
                    <Link to="/Relatorios" className={style.botao_categorias}>
                        <h2>Relatórios</h2>
                    </Link>
                </div>

                <div className={style.topbar_sair}>
                    <Link to='/perfil' id={style.botao_deslogar}>
                        <img
                            src={fotoPerfil ? fotoPerfil : SemFoto}
                            alt="Foto de perfil"
                            className={style.foto_perfil_imagem}
                        />
                    </Link>
                </div>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}