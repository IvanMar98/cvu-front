import CardItems from "./CardItems";
import perfilCuentaHook from "../customHooks/perfil-cuenta-hook";
import ModalError from "./ModalError";

function Inicio() {

    const { getUserData, errorTokenExpired, handleCloseModalError } = perfilCuentaHook();
    const cardItems = [
        {
            category: 'Datos Generales',
            items: [
                {
                    id: 'perfil-cuenta',
                    icon: 'fa-solid fa-user',
                    tittle: 'Perfil y Cuenta'
                },
                {
                    id: 'datos-contacto',
                    icon: 'fa-solid fa-address-book',
                    tittle: 'Datos de Contacto'
                },
                {
                    id: 'datos-laborales',
                    icon: 'fa-solid fa-briefcase',
                    tittle: 'Datos Laborales'
                }
            ]
        },
        {
            category: 'Perfil Academico',
            items: [
                {
                    id: 'productividad-academica',
                    icon: 'fa-solid fa-book-open-reader',
                    tittle: 'Productividad Academica'
                },
                {
                    id: 'titulos-academicos',
                    icon: 'fa-solid fa-graduation-cap',
                    tittle: 'Titulos Academicos'
                }
            ]
        }

    ]

    const handleClick = (event) => {
        const { id } = event.currentTarget;
        switch(id){
            case 'perfil-cuenta':
                getUserData();
        }
    }
    return (
        <div className="container-fluid d-flex flex-column  align-items-center h-100">
            <h1 className="text-primary fw-bold">Menu Principal</h1>
            <div className="container-fluid d-flex flex-column h-100 justify-content-center">
                {cardItems.map((category) => (
                    <div key={category.category} className="h-100 d-flex flex-column justify-content-center gap-4">
                        <h4 className="text-primary">{category.category}</h4>
                        <div key={category.category} className=" container-fluid d-flex justify-content-around">
                            {category.items.map((item) => (
                                <div 
                                role="button" 
                                onClick={handleClick}
                                id={item.id}
                                className = "text-decoration-none text-dark">
                                    <CardItems
                                        icon={item.icon}
                                        title={item.tittle}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {
                errorTokenExpired && (
                <ModalError
                title={'Error'}
                textBody={'Por seguridad, tu sesion ha expirado. Inicia sesion nuevamente para continuar'}
                handleCloseModalError={handleCloseModalError}
                ></ModalError>)
            }
        </div>
    );
}

export default Inicio;