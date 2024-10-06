import React from "react";
import './MemberDetail.css'

const MemberDetail = ({ member, onClose }) => {
  if (!member) return null; // If no member is selected, return null

  return (
    <div className="member-detail">
      <h2>Member Details</h2>
      <table>
        <tbody>
          <tr>
            <th>Gym ID:</th>
            <td>{member.gymId}</td>
          </tr>
          <tr>
            <th>Name:</th>
            <td>{member.name}</td>
          </tr>
          <tr>
            <th>Phone:</th>
            <td>{member.phone}</td>
          </tr>
          <tr>
            <th>Fees Date:</th>
            <td>{new Date(member.feesDate).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{member.address}</td>
          </tr>
          <tr>
            <th>Package Details:</th>
            <td>{member.packageDetails}</td>
          </tr>
          <tr>
            <th>Entry By:</th>
            <td>{member.entryBy}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MemberDetail;
