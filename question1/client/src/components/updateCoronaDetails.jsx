import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './memberDetails.css'
import { useNavigate } from 'react-router-dom';

function UpdateCoronaDetails(props) {
  const [coronaDetails, setCoronaDetails] = useState({_id:'', recoveryDate: '', positiveTestDate: '' });
  const [newVaccineRecords, setNewVaccineRecords] = useState([{ vaccineManufacturer: '', vaccinationDate: '' }, { vaccineManufacturer: '', vaccinationDate: '' }, { vaccineManufacturer: '', vaccinationDate: '' }, { vaccineManufacturer: '', vaccinationDate: '' }]);
  const [vaccineDateErrors, setVaccineDateErrors] = useState(Array(newVaccineRecords.length).fill(false));
  const [coronaDateError, setCoronaDateError] = useState(false);
  const [recoveryDateError, setRecoveryDateError] = useState(false);

  useEffect(() => {
    getCoronaDetails()
  }, [])

  const getCoronaDetails = async () => {
    await axios.get("http://localhost:9876/coronaVirusDetails/" + props.selectedMember.coronaVirusDetails)
      .then((res) => {
        setCoronaDetails({
          _id: res.data._id,
          recoveryDate: res.data.recoveryDate,
          positiveTestDate: res.data.positiveTestDate
        });
        setNewVaccineRecords([...res.data.vaccineRecords]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/updateMember');
  }

  const handleCoronaDetailsChange = (e) => {
    const { name, value } = e.target;
    setCoronaDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handelDelete=async()=>
  {
    await axios.delete("http://localhost:9876/coronaVirusDetails/"+coronaDetails._id).then((res)=>
    {
      console.log(res.data);
      updateMemberCVD(null)
      handleClose()
    }
    ).catch((err)=>
    {
      console.log(err);
    })
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

  const handlenewVaccineRecordChange = (e, index) => {
    const { name, value } = e.target;
    const updatedVaccineRecords = [...newVaccineRecords];
    updatedVaccineRecords[index] = { ...updatedVaccineRecords[index], [name]: value };
    
    let hasError = false;
    if (value !== "") {
      for (let i = index - 1; i >= 0; i--) {
        if (updatedVaccineRecords[i].vaccinationDate !== "" && value <= updatedVaccineRecords[i].vaccinationDate) {
          hasError = true;
          break;
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

    if (!coronaDetails.positiveTestDate && coronaDetails.recoveryDate) {
      setRecoveryDateError(true);
      isValid = false;
    } else {
      setRecoveryDateError(false);
      if (coronaDetails.recoveryDate && coronaDetails.positiveTestDate && coronaDetails.recoveryDate <= coronaDetails.positiveTestDate) {
        setCoronaDateError(true);
        isValid = false;
      } else {
        setCoronaDateError(false);
      }
    }

    if (isValid) {
      const coronavirusdetails = {
        "_id": coronaDetails._id,
        "vaccineRecords": newVaccineRecords,
        "positiveTestDate": coronaDetails.positiveTestDate,
        "recoveryDate": coronaDetails.recoveryDate
      };

      axios.put('http://localhost:9876/coronaVirusDetails', coronavirusdetails)
        .then(response => {
          console.log(response.data);
          handleClose();
        })
        .catch(error => {
          console.log(error);
        });
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
                <button className="button" onClick={handleClose}>cancel</button>&nbsp;&nbsp;
                <button type="button" onClick={handelDelete} className="button">delete</button> &nbsp;&nbsp;
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
                        value={record.vaccinationDate ? record.vaccinationDate.split("T")[0] : ""}
                        onChange={(e) => handlenewVaccineRecordChange(e, index)}
                        className={`form-control ${vaccineDateErrors[index] ? 'is-invalid' : ''}`}
                      />
                      {vaccineDateErrors[index] && <div style={{ "color": "red" }} className="invalid-feedback">Vaccination date must be after the previous one.</div>}
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
                    value={coronaDetails.positiveTestDate ? coronaDetails.positiveTestDate.split("T")[0] : ""}
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
                    value={coronaDetails.recoveryDate ? coronaDetails.recoveryDate.split("T")[0] : ""}
                    onChange={handleCoronaDetailsChange}
                    className={`form-control ${recoveryDateError ? 'is-invalid' : ''}`}
                    />
                    {recoveryDateError && <div style={{ "color": "red" }} className="invalid-feedback">Recovery date cannot be provided without a positive test date.</div>}
                  </div>
                  {coronaDateError && <div style={{ "color": "red" }} className="invalid-feedback">Recovery date cannot be before the positive test date.</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default UpdateCoronaDetails;