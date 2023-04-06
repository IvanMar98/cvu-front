import '../assets/styles/Header.css'
import LogoTecNac from '../assets/img/IV11.png';
import LogoTecEca from '../assets/img/IV12.png';
function Header(){
    return(
        <div className=" container-header container-fluid border-bottom border-5 border-secondary
            d-flex justify-content-between d-flex justify-content-between align-items-center
            ps-5 pe-5">
            <div>
                <img src= {LogoTecEca} width = "150px" alt="Tecnologico de Estudios Superiores de Ecatepec Logo" />
            </div>
            <div>
                <img src={LogoTecNac} width = "100px" alt="Tecnologico Nacional de MExico Logo" />
            </div>
        </div>
    );
}
export default Header;