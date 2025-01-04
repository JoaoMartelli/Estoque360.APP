import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import Logo from "../../assets/LogoEstoque360.png";
import style from "./Topbar.module.css";
import { useEffect, useState } from "react";
import { MdLogout } from 'react-icons/md';

export function Topbar({ children }) {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {

    }, []);

    function Sair() {
        localStorage.removeItem('id')
    }

    return (
        <div>
            <div className={style.topbar_conteudo}>
                <div className={style.topbar_corpo}>
                        <a href="/home"><img src={Logo}alt="Logo-Estoque360" className={style.logo} />
                        </a>

                    <hr />

                    <Link to="/Categorias" className={style.botao_categorias}>
                        <h2>Categorias</h2>
                    </Link>
                </div>

                <div className={style.topbar_sair}>
                    <Link to="/Perfil" className={style.botao_perfil}>
                        <MdAccountCircle />
                    </Link>

                    <Link to='/login' className={style.botao_deslogar} onClick={Sair}>
                        <MdLogout />
                    </Link>
                </div>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}