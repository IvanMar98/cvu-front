import CardItems from "./CardItems";
import { Link } from "react-router-dom";

function Inicio() {
    return (
        <div className="container-fluid d-flex flex-column align-items-center pt-4 pb-4">
            <h1 className="text-primary fw-bold mb-5">Menu Principal</h1>
            <div className="container-fluid d-flex flex-column mb-4">
                <h4 className="text-primary fs-4 ps-3 mb-3">Datos Generales</h4>
                <div className=" container-fluid d-flex justify-content-around">
                    <Link to={'/perfil-cuenta'} className = "text-decoration-none text-dark">
                        <CardItems 
                            icon="fa-solid fa-user" 
                            title="Perfil y Cuenta"
                        />
                    </Link>
                    <Link to={'/datos-contacto'} className = "text-decoration-none text-dark">
                        <CardItems
                            icon="fa-solid fa-address-book"
                            title="Datos de Contacto"
                        />
                    </Link>
                    <Link to={'/datos-laborales'} className = "text-decoration-none text-dark">
                        <CardItems
                            icon="fa-solid fa-briefcase" 
                            title="Datos Laborales"
                        />
                    </Link>
                    
                </div>
            </div>
            <div className="container-fluid d-flex flex-column">
                <h4 className="text-primary fs-4 ps-3 mb-3">Perfil Academico</h4>
                <div className="container-fluid d-flex justify-content-around">
                    <Link to={'/productividad-academica'} className = "text-decoration-none text-dark">
                        <CardItems
                            icon="fa-solid fa-book-open-reader"
                            title="Productividad Academica"
                        />
                    </Link>
                    <Link to={'/titulos-academicos'} className = "text-decoration-none text-dark">
                        <CardItems
                            icon="fa-solid fa-graduation-cap"
                            title="Titulos Academicos"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Inicio;