import React, { useState } from 'react';
import './MemberList.css';
import { useNavigate } from 'react-router-dom';
import MemberDetail from '../MemberDetail/MemberDetail';

const MemberList = ({ members, onEdit, onDelete }) => {
    const [selectedMember, setSelectedMember] = useState(null); // State to store selected member
    const [searchTerm, setSearchTerm] = useState(''); // State to handle search input
    const navigate = useNavigate(); // useNavigate hook to programmatically navigate

    const handleView = (member) => {
        setSelectedMember(member); // Set the selected member to show details
    };

    const handleClose = () => {
        setSelectedMember(null); // Reset selected member when closed
    };

    const handleEdit = (member) => {
        onEdit(member); // Pass the member to the parent component (App.js)
        navigate('/'); // Navigate to the MemberForm page ("/")
    };

    // Filter and sort members based on the Gym ID search term
    const filteredMembers = members
        .filter((member) =>
            member.gymId.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.gymId.localeCompare(b.gymId)); // Sort members by gymId

    return (
        <div className="member-list">
            <h2>Manage Members</h2>
            
            {/* Search Input */}
            <div className='search-container'>
                <input
                    type="text"
                    placeholder="Search by Gym ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Gym ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Fees Date</th>
                        <th>Address</th>
                        <th>Package Details</th>
                        <th>Entry By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMembers.map((member) => (
                        <tr key={member._id}>
                            <td>{member.gymId}</td>
                            <td>{member.name}</td>
                            <td>{member.phone}</td>
                            <td>{new Date(member.feesDate).toLocaleDateString()}</td>
                            <td>{member.address}</td>
                            <td>{member.packageDetails}</td>
                            <td>{member.entryBy}</td>
                            <td>
                                <button onClick={() => handleEdit(member)}>Update</button>
                                <button onClick={() => onDelete(member._id)}>Delete</button>
                                <button onClick={() => handleView(member)}>View</button> {/* View Button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render MemberDetail if selected */}
            <MemberDetail member={selectedMember} onClose={handleClose} />
        </div>
    );
};

export default MemberList;
