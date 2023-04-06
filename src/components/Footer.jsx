import React from "react";
import '../assets/styles/Footer.css'

function Footer() {
    return (
        <div className=" container-footer container-fluid d-grid grid-colum-3 bg-ligth
            border-top border-5 border-secondary align-items-center">
            <div className="row justify-content-between">
                <div className="col-2 d-flex justify-content-center">
                    <img src="" alt="logo_algo" />
                </div>
                <div className="col-8">
                    <p className="text-center col">
                        Av. Tecnológico S/N C.P. 55210 Col. Valle de Anáhuac, Ecatepec de Morelos, Estado de México
                    </p>
                    <p className="text-center col">
                        Teléfono: 01 (55) 50 00 23 00
                    </p>
                    <p className="text-center col">
                        E-mail: webmaster_tese@tese.edu.mx
                    </p>
                </div>
                <div className="col-2 d-flex justify-content-center">
                    <img src="" alt="logo_algo" />
                </div>
            </div>
        </div>
    );
};

export default Footer