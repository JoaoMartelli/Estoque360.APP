import style from "./Home.module.css";
import Logo from "../../assets/LogoBrancoEstoque360.png";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MulherAnalisandoGraficoDeCostas from "../../assets/MulherAnalisandoGraficoDeCostas.png";
import MulherAnalisandoGraficoDeLado from "../../assets/MulherAnalisandoGraficoDeLado.png";

export default function Home() {
    const navigate = useNavigate();

    function Entrar() {
        navigate("/login");
    }

    return (
        <div>
            <div className={style.topbar_conteudo}>
                <div className={style.topbar_corpo}>
                    <a href="/home"><img src={Logo} alt="Logo-Estoque360" className={style.logo} />
                    </a>
                </div>

                <div className={style.topbar_sair}>
                    <Button id={style.botao_entrar} onClick={Entrar}>Entrar</Button>
                </div>
            </div>

            <div className={style.pagina_conteudo}>
                <div className={style.informacoes}>
                    <p>O Estoque360 nasceu com o propósito de oferecer uma solução simples e eficiente para ajudar microempreendedores a gerenciarem seus estoques de forma prática e acessível. Entendemos os desafios enfrentados no dia a dia de quem empreende, como a falta de controle sobre entradas e saídas de produtos, o que pode impactar diretamente os resultados do negócio. Por isso, criamos uma plataforma que centraliza todas as informações em um só lugar, permitindo que você acompanhe seu estoque em tempo real, organize suas categorias de produtos e tome decisões mais seguras para o crescimento do seu empreendimento.</p>
                    <img src={MulherAnalisandoGraficoDeLado} alt="Pessoa Analisando Grafico de Lado" />
                </div>
                <div className={style.informacoes}>
                    <img src={MulherAnalisandoGraficoDeCostas} alt="Pessoa Analisando Grafico de Costas" />
                    <p>Junte-se ao Estoque360 e dê o próximo passo na profissionalização do seu negócio! Cadastre-se agora mesmo e tenha acesso a uma ferramenta intuitiva e completa que vai transformar a forma como você gerencia seus produtos. Simplifique o controle do seu estoque e foque no que realmente importa: o sucesso do seu negócio!
                        <br/>
                        <Link to="/login" id={style.cadastrar}>Cadastre-se</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}