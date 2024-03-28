import React, { useState } from 'react';
import axios from 'axios';
import './memberDetails.css'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export default function MemberDetails(props) {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    const [phoneError, setPhoneError] = useState(false);
    const [mobilePhoneError, setMobilePhoneError] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        city: '',
        identityCard: '',
        street: '',
        number: 0,
        DateOfBirth: '',
        Telephone: '',
        MobilePhone: ''
    });
    const [err, setErr] = useState(false)
    const errorDup = useRef("")

    const handleFileChange = (event) => {

        setSelectedFile(event.target.files[0]);
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === "identityCard") {
            setErr(false)
            errorDup.current = ""
        }
        setFormData({ ...formData, [name]: value });
        if (name === "MobilePhone") {
            if (!/^\d+$/.test(value)) {
                setMobilePhoneError(true)
            }
            if (value.length < 10 || value.length > 10) {
                setMobilePhoneError(true)
            }
            if(/^\d+$/.test(value)&&value.length > 7 && value.length < 10)
            {
                setMobilePhoneError(false)
            }
        }
        if (name === "Telephone") {
            if (!/^\d+$/.test(value)) {
                setPhoneError(true)
            }
            if (value.length < 7 || value.length > 10) {
                setPhoneError(true)
            }
            if(/^\d+$/.test(value)&&value.length > 7 && value.length < 10)
            {
                setPhoneError(false)
            }
        }
    };

    const getMembers = async () => {
        try {
            const response = await axios.get("http://localhost:9876/members");
            props.setMembers(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleClose = () => {
        navigate("/")
    }
    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();
        let isValid=true;
        if(phoneError||mobilePhoneError)
        {
            isValid=false;
        }
        if (isValid){
            const address = formData.street + ' ' + formData.number + ' , ' + formData.city
            try {
                const FD = new FormData();
                FD.append("firstName", formData.firstName)
                FD.append("lastName", formData.lastName)
                FD.append("identityCard", formData.identityCard)
                FD.append("DateOfBirth", formData.DateOfBirth)
                FD.append("Telephone", formData.Telephone)
                FD.append("address", address)
                FD.append("MobilePhone", formData.MobilePhone)
                FD.append("Img", selectedFile)
    
                await axios.post('http://localhost:9876/members', FD).then((res) => {
                    setErr(false);
                    console.log(res.data);
                    getMembers()
                }
                ).catch((err) => {
                    setErr(true)
                    errorDup.current = err.response.data
                    return;
                });
                if (errorDup.current === "") {
                    setFormData({
                        firstName: '',
                        lastName: '',
                        city: '',
                        identityCard: '',
                        street: '',
                        number: 0,
                        DateOfBirth: '',
                        Telephone: '',
                        MobilePhone: ''
                    });
                    handleClose()
    
                }
    
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
                            <h3>Member Details</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="identityCard">Identity Card:</label>
                                    <input
                                        type="text"
                                        id="identityCard"
                                        name="identityCard"
                                        value={formData.identityCard}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                {err ? <h3>{errorDup.current}</h3> : <></>}

                                <div className="form-group">
                                    <label htmlFor="city">City:</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="street">Street:</label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="number">Number:</label>
                                    <input
                                        type="number"
                                        id="number"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="DateOfBirth">Date of Birth:</label>
                                    <input
                                        type="date"
                                        id="DateOfBirth"
                                        name="DateOfBirth"
                                        value={formData.DateOfBirth}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Telephone">Telephone:</label>
                                    <input
                                        type="text"
                                        id="Telephone"
                                        name="Telephone"
                                        value={formData.Telephone}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                {phoneError && <div style={{ "color": "red" }} className="invalid-feedback">not valid telephone</div>}

                                <div className="form-group">
                                    <label htmlFor="MobilePhone">Mobile Phone:</label>
                                    <input
                                        type="text"
                                        id="MobilePhone"
                                        name="MobilePhone"
                                        value={formData.MobilePhone}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                {mobilePhoneError && <div style={{ "color": "red" }} className="invalid-feedback">not valid mobilePhone</div>}

                                <label class="file-input-wrapper">
                                    <span class="file-input-label">Choose a file</span>
                                    <input type="file" name="Img" class="file-input" onChange={handleFileChange} />
                                </label>
                                <br></br>
                                <br></br>
                                <button className="button" type="submit" >OK</button>&nbsp;&nbsp;
                                <button className="button" onClick={handleClose} >cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}