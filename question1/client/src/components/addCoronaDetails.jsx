
import React, { useState } from 'react';
import axios from 'axios';
import './memberDetails.css'
import { useNavigate } from 'react-router-dom';

function AddCoronaDetails(props) {
    const [coronaDetails, setCoronaDetails] = useState({ recoveryDate: '', positiveTestDate: '' });
    const [newVaccineRecords, setNewVaccineRecords] = useState([{ vaccineManufacturer: '', vaccinationDate: '' }, { vaccineManufacturer: '', vaccinationDate: '' }, { vaccineManufacturer: '', vaccinationDate: '' }, { vaccineManufacturer: '', vaccinationDate: '' }]);
    const [vaccineDateErrors, setVaccineDateErrors] = useState(Array(newVaccineRecords.length).fill(false));
    const [coronaDateError, setCoronaDateError] = useState(false);
    const [recoveryDateError, setRecoveryDateError] = useState(false); // New state for recovery date error
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/updateMember');
    }

    const updateMemberCVD = async (_id) => {
        const a = { ...props.selectedMember };
        a.coronaVirusDetails = _id;
        props.setSelectedMember(a);
        try {
            const res = await axios.put("http://localhost:9876/members", a);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleCoronaDetailsChange = (e) => {
        const { name, value } = e.target;
        setCoronaDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlenewVaccineRecordChange = (e, index) => {
        const { name, value } = e.target;
        const updatedVaccineRecords = [...newVaccineRecords];
        updatedVaccineRecords[index] = { ...updatedVaccineRecords[index], [name]: value };
        
        // Validate against all previous records only if the value is not empty
        let hasError = false;
        if (value !== "") {
            for (let i = index - 1; i >= 0; i--) {
                if (updatedVaccineRecords[i].vaccinationDate !== "" && value <= updatedVaccineRecords[i].vaccinationDate) {
                    hasError = true;
                    break;
                }
            }
        }


        if (value !== "") {
            for (let i = index+1; i <4; i++) {
                if (updatedVaccineRecords[i].vaccinationDate !== "" && value >= updatedVaccineRecords[i].vaccinationDate) {
                    hasError = true;
                    break;
                }
            }
        }

        setNewVaccineRecords(updatedVaccineRecords);
    
        setVaccineDateErrors(prevState => {
            const newState = [...prevState];
            newState[index] = hasError;
            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;

        // Check if both positive test date and recovery date are provided
        if (!coronaDetails.positiveTestDate && coronaDetails.recoveryDate) {
            setRecoveryDateError(true); // Set recovery date error
            isValid = false;
        } else {
            setRecoveryDateError(false); // Reset recovery date error
            // Check if recovery date is before positive test date
            if (coronaDetails.recoveryDate && coronaDetails.positiveTestDate && coronaDetails.recoveryDate <= coronaDetails.positiveTestDate) {
                setCoronaDateError(true);
                isValid = false;
            } else {
                setCoronaDateError(false);
            }
        }

        if (isValid) {
            const coronavirusdetails = { "vaccineRecords": newVaccineRecords, "positiveTestDate": coronaDetails.positiveTestDate, "recoveryDate": coronaDetails.recoveryDate };
            
            try {
                const response = await axios.post('http://localhost:9876/coronaVirusDetails', coronavirusdetails);
                updateMemberCVD(response.data._id);
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Update Member Details</h3>
                        </div>
                        <div className="card-body">
                            <br></br>
                            <form onSubmit={handleSubmit}>
                                <button className="button" type="submit">OK</button>&nbsp;&nbsp;
                                <button className="button" onClick={handleClose}>cancel</button>
                                <br></br>
                                <br></br>

                                {newVaccineRecords.map((record, index) => (
                                    <div key={index}>
                                        <span>Vaccination {index + 1}: </span>
                                        <div className="form-group">
                                            <label htmlFor={`vaccineManufacturer${index}`}>Vaccine Manufacturer:</label>
                                            <input
                                                type="text"
                                                id={`vaccineManufacturer`}
                                                name={`vaccineManufacturer`}
                                                value={record.vaccineManufacturer}
                                                onChange={(e) => handlenewVaccineRecordChange(e, index)}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`vaccinationDate${index}`}>Vaccination Date:</label>
                                            <input
                                                type="date"
                                                id={`vaccinationDate`}
                                                name={`vaccinationDate`}
                                                value={record.vaccinationDate}
                                                onChange={(e) => handlenewVaccineRecordChange(e, index)}
                                                className={`form-control ${vaccineDateErrors[index] ? 'is-invalid' : ''}`}
                                            />
                                            {vaccineDateErrors[index] && <div style={{"color":"red"}} className="invalid-feedback">Vaccination date must be after the previous one.</div>}
                                        </div>
                                    </div>
                                ))}
                                <br></br>
                                <span>corona details </span>
                                <br></br>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="positiveTestDate">Positive Test Date:</label>
                                    <input
                                        type="date"
                                        id="positiveTestDate"
                                        name="positiveTestDate"
                                        value={coronaDetails.positiveTestDate}
                                        onChange={handleCoronaDetailsChange}
                                        className={`form-control ${coronaDateError ? 'is-invalid' : ''}`}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recoveryDate">Recovery Date:</label>
                                    <input
                                        type="date"
                                        id="recoveryDate"
                                        name="recoveryDate"
                                        value={coronaDetails.recoveryDate}
                                        onChange={handleCoronaDetailsChange}
                                        className={`form-control ${recoveryDateError ? 'is-invalid' : ''}`} // Apply error class based on recoveryDateError state
                                    />
                                    {recoveryDateError && <div style={{"color":"red"}} className="invalid-feedback">Recovery date cannot be provided without a positive test date.</div>}
                                </div>
                                {coronaDateError && <div style={{"color":"red"}} className="invalid-feedback">Recovery date cannot be before the positive test date.</div>}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCoronaDetails;
