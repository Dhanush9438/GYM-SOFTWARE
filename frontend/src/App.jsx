import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MemberForm from './components/MemberForm/MemberForm';
import MemberList from './components/MemberList/MemberList';

const App = () => {
    const [members, setMembers] = useState([]);
    const [currentMember, setCurrentMember] = useState(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch('https://gym-software.onrender.com/members');
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const addOrUpdateMember = async (member) => {
        try {
            if (currentMember) {
                await fetch(`https://gym-software.onrender.com/members/${currentMember._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(member),
                });
                alert('Member updated successfully!');
            } else {
                await fetch('https://gym-software.onrender.com/members/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(member),
                });
                alert('Member added successfully!');
            }
            fetchMembers();
            setCurrentMember(null);
        } catch (error) {
            console.error('Error saving member:', error);
            alert('Could not save member. Please try again.');
        }
    };

    const deleteMember = async (id) => {
        try {
            await fetch(`https://gym-software.onrender.com/members/${id}`, {
                method: 'DELETE',
            });
            alert('Member deleted successfully!');
            fetchMembers();
        } catch (error) {
            console.error('Error deleting member:', error);
            alert('Could not delete member. Please try again.');
        }
    };

    const editMember = (member) => {
        setCurrentMember(member);
    };

    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <ul>
                        <li>
                            <Link to="/">Add Member</Link>
                        </li>
                        <li>
                            <Link to="/members">Manage Members</Link>
                        </li>
                    </ul>
                </nav>
                <div className="content">
                    <Routes>
                        <Route
                            path="/"
                            element={<MemberForm onSubmit={addOrUpdateMember} currentMember={currentMember} />}
                        />
                        <Route
                            path="/members"
                            element={<MemberList members={members} onEdit={editMember} onDelete={deleteMember} />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
