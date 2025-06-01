export const modalConfig = [
    {
        id: 'FORB-002',
        title: 'Usuario o contraseña incorrectos',
        textBody: 'Por favor, revisa tu informacion.',
        modalId: 'modal-error-FORB-002',
        mainButtonText: 'Entendido',
        type:'danger',
        icon: 'fa-solid fa-xmark',
    },
    {
        id: 'UNF-001',
        title: 'Usuario no encontrado',
        textBody: 'Lo sentimos, no pudimos encontrar el usuario ingresado. Revisa la informacion e intentalo de nuevo',
        modalId: 'modal-error-UNF-001',
        mainButtonText: 'Entendido',
        type:'danger',
        icon: 'fa-solid fa-xmark',
    },
    {
        id: 'UNF-002',
        title: 'Error mostrando la informacion',
        textBody: 'Operacion no disponible.',
        modalId: 'modal-error-UNF-002',
        mainButtonText: 'Salir',
        canUserRetry: true,
        maxRetries: 3,
        type:'danger',
        icon: 'fa-solid fa-xmark',
    },
    {
        id: 'UNF-003',
        title: 'Operacion no disponible',
        textBody: 'Error al actualizar la informacion.',
        modalId: 'modal-error-UNF-003',
        mainButtonText: 'Entendido',
        type:'danger',
        icon: 'fa-solid fa-xmark',
    },
    {
        id: 'UNF-004',
        title: 'Operacion no realizada',
        textBody: 'Hubo un problema al eliminar el número teléfonico.',
        modalId: 'modal-error-UNF-004',
        mainButtonText: 'Entendido',
        type:'danger',
        icon: 'fa-solid fa-xmark',
        canUserRetry: true,
        maxRetries: 3
    },
    {
        id: 'PNNF-001',
        title: 'Operacion no realizada',
        textBody: 'Hubo un problema al eliminar el número teléfonico.',
        modalId: 'modal-error-PNNF-001',
        mainButtonText: 'Entendido',
        type:'danger',
        icon: 'fa-solid fa-xmark',
        canUserRetry: true,
        maxRetries: 3
    },
    {
        id: 'TKE-001',
        title: 'Sesión Expirada',
        textBody: 'Por seguridad, inicia sesión nuevamente para continuar.',
        mainButtonText: 'Entendido',
        modalId: 'modal-error-expired-token',
        icon: "fa-solid fa-xmark",
        type: "danger",
    },
    {
        id: 'TNA-001',
        title: "Warning",
        textBody: "Debes aceptar los términos y condiciones para continuar.",
        modalId: "modal-terms-error",
        mainButtonText: "Entendido", 
        icon: "fa-solid fa-exclamation-triangle",
        type: "warning",
    },
    {
        id: 'VALER-001',
        title: "Error",
        textBody: "Error complentando el registro.",
        modalId: "modal-error-VALER-001",
        mainButtonText: "Salir",
        canUserRetry: true,
        maxRetries: 3,
        icon: "fa-solid fa-exclamation-triangle",
        type: "danger",
    },
    {
        id:'UNERG-001',
        title: "Informacion duplicada",
        modalId: "modal-error-UNERG-001",
        mainButtonText: "Entendido",
        icon: "fa-solid fa-exclamation-triangle",
        type: "danger",
    },
    {
        id: 'CLEAN-MODAL',
        title: "",
        textBody: "",
        modalId: "",
        mainButtonText: "",
        icon: "",
        type: "",
        modalOpen: false
    },
    {
        id: 'CANCEL-REGISTRY',
        title: 'Advertencia',
        textBody: '¿Seguro que deseas cancelar el proceso?. Los datos ya ingresados no se guardaran',
        modalId: 'modal-registry-are-user-sure-to-leave',
        mainButtonText: 'Salir',
        secondaryButtonText: 'Cancelar',
        canUserRetry: true,
        icon: 'fa-solid fa-circle-check',
        type: 'warning'
    },
    {
        id: 'UNEXPECTED-ERROR',
        title: 'Error inesperado',
        textBody: 'Lo sentimos, ha ocurrido un error inesperado',
        modalId: 'modal-error-UNEXPECTED-ERROR',
        mainButtonText: 'Entendido',
        type:'danger',
        icon: 'fa-solid fa-xmark',
    },
    {
        id: 'SUCCESS-REG-001',
        title: 'Usuario Registrado',
        textBody: 'El usuario a sido registrado con extio.',
        modalId: 'modal-user-registry-success',
        mainButtonText: 'Entendido',
        icon: 'fa-solid fa-circle-check',
        type: 'success'
    },
    {
        id: 'IMGUP-001',
        title: 'Error al cargar el archivo',
        textBody: 'Lo sentimos, no se ha podido cargar el archivo. Intentalo nuevamente',
        modalId: 'modal-error-IMGUP-001',
        mainButtonText: 'Entendido',
        type:'danger',
        icon: 'fa-solid fa-xmark',
    },
    {
        id: 'SUCCESS-UPDATE-INFO-001',
        title: 'Informacion Actualizada!',
        textBody: 'La informacion a sido actualizada con exito.',
        mainButtonText: 'Entendido',
        modalId: 'modal-user-biography-updated-success',
        icon: 'fa-solid fa-circle-check',
        type: 'success'
    },
    {
        id: 'PNF-001',
        title: 'Operacion no disponible!',
        textBody: 'Error mostrando la informacion.',
        mainButtonText: 'Entendido',
        modalId: 'modal-error-PNF-001',
        icon: 'fa-solid fa-xmark',
        type: 'danger',
        canUserRetry: true,
        maxRetries: 3,
    },
    {
        id: 'CANCEL-EDIT-INFO',
        title: 'Advertencia!',
        textBody: '¿Seguro que deseas cancelar el proceso?. Los datos ya ingresados no se guardaran',
        modalId: 'modal-edit-info-are-user-sure-to-leave',
        mainButtonText: 'Salir',
        secondaryButtonText: 'Cancelar',
        canUserRetry: true,
        icon: 'fa-solid fa-circle-check',
        type: 'warning'
    },
    {
        id: 'DELETE-PHONE-NUMBER',
        title: 'Alerta!',
        textBody: '¿Seguro que deseas eliminar este registro?',
        modalId: 'modal-delete-phone-number',
        mainButtonText: 'Entendido',
        secondaryButtonText:'Cancelar',
        icon: 'fa-solid fa-triangle-exclamation',
        type: 'warning',
        canUserRetry: true
    },
    {
        id: 'FIELD-REQUIRED',
        title: 'Operacion no realizada',
        textBody: 'No se pudo completar la solicitud. Intentalo nuevamente.',
        modalId: 'modal-error-FIELD-REQUIRED',
        mainButtonText: 'Entendido',
        icon: 'fa-solid fa-triangle-exclamation',
        type: 'danger'
    },
    {
        id: 'DELETE-NUMBER-SUCCESS',
        title: 'Success!',
        textBody: 'Numero Telefonico eliminado correctamente!',
        modalId: 'modal-phone-number-deleted-success',
        mainButtonText: 'Ok',
        icon: 'fa-solid fa-circle-check',
        type: 'success',
        canUserRetry: false
    },
    {
        id: 'NUMBER-ADDED-SUCCESS',
        title: 'Exito!',
        textBody: 'Numero Telefonico agregado con exito!',
        modalId: 'modal-phone-number-added-success',
        mainButtonText: 'Ok',
        icon: 'fa-solid fa-circle-check',
        type: 'success',
        canUserRetry: false
    }
];

export const modalErrors = [
    {
        id: 'TC-001',
        error: 'modal-terms-error-primary-button',
        navigate: false,
    },
    {
        id: 'LP-002',
        error: 'modal-registry-are-user-sure-to-leave-primary-button',
        navigate: true,
    },
    {
        id: 'FR-003',
        error: 'modal-error-field-repeted-primary-button',
        navigate: false
    },
    {
        id: 'ACR-004',
        error: 'modal-error-account-already-registered-primary-button',
        navigate: true,
    },
    {   id: 'VALER-001',
        error: 'modal-error-VALER-001-primary-button',
        navigate: true
    },
    {
        id: 'UNERG-001',
        error: 'modal-error-UNERG-001-primary-button',
        navigate: false
    },
    {
        id: 'UNERG-002',
        error: 'modal-error-UNERG-002-primary-button',
        navigate: true
    },
    {   
        id: 'UNEXPECTED-ERROR',
        error: 'modal-error-UNEXPECTED-ERROR-primary-button',
        navigate: true,
        navigateTo: '/'
    },
    {
        id: 'SUCCESS-REG-001',
        error: 'modal-user-registry-success-primary-button',
        navigate: true
    },
    {
        id: 'TKE-001',
        error: 'modal-error-expired-token-primary-button',
        navigate: true,
        navigateTo: '/'
    },
    {
        id: 'UNF-002',
        error: 'modal-error-UNF-002-primary-button',
        navigate: true
    },
    {
        id: 'UPDER-001',
        error: 'modal-error-UPDER-001-primary-button',
        navigate: false
    },
    {
        id: 'LPB-001',
        error: 'modal-edit-info-are-user-sure-to-leave-primary-button',
        navigate: true,
    },
    {
        id: 'UNF-003',
        error: 'modal-error-UNF-003-primary-button',
        navigate: true,
    },
    {
        id: 'IMGUP-001',
        error: 'modal-error-IMGUP-001-primary-button',
        navigate:false
    },
    {
        id: 'UPBSC-001',
        error: 'modal-user-biography-updated-success-primary-button',
        navigate: true
    },
    {
        id: 'PNF-001',
        error: 'modal-error-PNF-001-primary-button',
        navigate: true
    },
    {
        id: 'DELETE-PHONE-NUMBER',
        error: 'modal-delete-phone-number-primary-button',
        navigate: false
    },
    {
        id: 'FIELD-REQUIRED',
        error: 'modal-error-FIELD-REQUIRED-primary-button',
        navigate: true
    },
    {
        id: 'UNF-004',
        error: 'modal-error-UNF-004-primary-button',
        navigate: true
    },
    {
        id: 'NUMBER-ADDED-SUCCESS',
        error: 'modal-phone-number-added-success-primary-button',
        navigate: true,
        navigateTo: '/datos-contacto/telefonos'
    }
]

export const getModalById = (id) => {
    const base = modalConfig.find(modal => modal.id === id) || modalConfig.find(modal => modal.id === 'UNEXPECTED-ERROR');
    return { ...base };
};

export const getModalCloseAction = (id) => {
    const closeCase = modalErrors.find(modalCase => modalCase.error === id);
    return {...closeCase };
}
export const retryOperation = (modalConf, attemptNumber) => {
    const newModalConfig = { ...modalConf };
    
    if(!newModalConfig.canUserRetry){
        return{
            attemptNumber, modalConf: newModalConfig
        }
    };

    if(attemptNumber < newModalConfig.maxRetries){
        newModalConfig.textBody += ' Intentelo nuevamente.';
        newModalConfig.secondaryButtonText = 'Reintentar';
        return {
            attemptNumber: attemptNumber + 1,
            modalConf: newModalConfig
        };
    }else {
       
        newModalConfig.textBody += ' Intentelo nuevamente mas tarde.';
        newModalConfig.canUserRetry = false;
        return {
            attemptNumber: 0,
            modalConf: newModalConfig
        }
    };
}