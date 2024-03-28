import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './allMembers.css';
import { useNavigate } from 'react-router-dom';

export default function AllMembers({selectedMember, setSelectedMember}) {
    const [members, setMembers] = useState([]);
    
    const navigate=useNavigate()


    const handleAddMember = () => {
        navigate("/addMember")
    };

    const getMembers = async () => {
        try {
            const response = await axios.get("http://localhost:9876/members");
            setMembers(response.data);
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMembers();
    }, []);

    const renderHeader = () => {
        return (
            <div className="header">
                <div>All Members</div>
                <button onClick={handleAddMember}>Add Member</button>
                
            </div>
        );
    };

    const header = renderHeader();

    const handleRowClick = (member) => {
        setSelectedMember(member);
        navigate("/updateMember")

    };

    return (
        <div>
            {header}
            <br />
            <div className="card">
                {members.length > 0 ? (
                    <table className="member-table">
                        <thead>
                            <tr>
                            <th>Image</th>
                                <th>Identity Card</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Date of Birth</th>
                                <th>Telephone</th>
                                <th>Mobile Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.id} onClick={() => handleRowClick(member)}>
                                    <td>
                                        {member.Img!=null?
                                        <img class="logo" src={"http://localhost:9876/uploads/"+member.Img.split("\\")[2]}>
                                        </img>:<h3>no Img</h3>}
                                    </td>
                                    <td>{member.identityCard}</td>
                                    <td>{member.firstName}</td>
                                    <td>{member.lastName}</td>
                                    <td>{member.address}</td>
                                    <td>{moment(member.DateOfBirth).format('DD/MM/YYYY')}</td>
                                    <td>{member.Telephone}</td>
                                    <td>{member.MobilePhone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No members found.</div>
                )}
            </div>
            {/* {addMember && <MemberDetails setAddMember={setAddMember} setMembers={setMembers} setOpenDialog={setOpenDialog} setAddCorona={setAddCorona} />}
            {openDialog && <UpdateMember setMembers={setMembers}  setOpenDialog={setOpenDialog} selectedMember={selectedMember} setAddMember={setAddMember} setAddCorona={setAddCorona} addCorona={addCorona}/>} */}
        </div>
    );
}
