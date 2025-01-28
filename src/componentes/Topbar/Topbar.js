import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import Logo from "../../assets/LogoBrancoEstoque360.png";
import style from "./Topbar.module.css";
import { useEffect, useState } from "react";
import { MdLogout } from 'react-icons/md';

export function Topbar({ children }) {
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

                    <Link to="/Categorias" className={style.botao_categorias}>
                        <h2>Categorias</h2>
                    </Link>
                    <Link to="/Produtos" className={style.botao_categorias}>
                        <h2>Produtos</h2>
                    </Link>
                </div>

                <div className={style.topbar_sair}>
                    <Link to='/login' id={style.botao_deslogar} onClick={Sair}>
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