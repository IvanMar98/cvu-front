
function Table({phoneNumbers, handleOptionPhoneNumber}){
    return(
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center pt-4 pb-4">
            {phoneNumbers.length > 0 ? (
                <table className="table align-middle table-hover table-striped">
                <thead>
                    <tr>
                    <th className="text-primary" scope="col"></th>
                    <th className="text-primary" scope="col">Number</th>
                    <th className="text-primary" scope="col">Type</th>
                    <th className="text-primary" scope="col" colSpan="2">Principal</th>
                    </tr>
                </thead>
                <tbody>
                    {phoneNumbers.map((number, index) => (
                       <tr key={number.phone_number_id}>
                            <th className="text-primary" scope="row">{number.phone_number_id}</th>
                            <td>{number.phone_number}</td>
                            <td>{number.phone_type}</td>
                            {number.is_primary? (
                                <>
                                    <td>Si</td>
                                </>
                            ): (
                                <>
                                    <td>No</td>
                                </>
                            )}
                            <td className="d-flex justify-content-center">
                                <div className="options-container">
                                    <i id="edit-option-phone-number" className={`${number?.options?.edit?.icon} ${number?.options?.edit?.class} p-2`} onClick={(e) => handleOptionPhoneNumber(e, index)}></i>
                                    <i id="delete-option-phone-number" className={`${number?.options?.delete?.icon} ${number?.options?.delete?.class} p-2`} onClick={(e) => handleOptionPhoneNumber(e, index)}></i>
                                </div>
                            </td>
                       </tr> 
                    ))}
                </tbody>
            </table>
            ): (
                <div>
                    Aun no registrar algun numero telefonico
                 </div>
            )}
        </div>
    );
};

export default Table;