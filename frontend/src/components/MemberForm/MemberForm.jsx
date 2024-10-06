import React, { useState, useEffect } from "react";
import "./MemberForm.css"; // Importing CSS

const MemberForm = ({ onSubmit, currentMember }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [feesDate, setFeesDate] = useState("");
  const [address, setAddress] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [entryBy, setEntryBy] = useState("");
  const [gymId, setGymId] = useState(""); // Added gymId state

  useEffect(() => {
    if (currentMember) {
      setName(currentMember.name);
      setPhone(currentMember.phone);
      setFeesDate(currentMember.feesDate.split("T")[0]); // Format date
      setAddress(currentMember.address);
      setPackageDetails(currentMember.packageDetails);
      setEntryBy(currentMember.entryBy);
      setGymId(currentMember.gymId); // Set gymId for editing
    } else {
      resetForm();
    }
  }, [currentMember]);

  const resetForm = () => {
    setName("");
    setPhone("");
    setFeesDate("");
    setAddress("");
    setPackageDetails("");
    setEntryBy("");
    setGymId(""); // Reset gymId
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      phone,
      feesDate,
      address,
      packageDetails,
      entryBy,
      gymId,
    }); // Include gymId
    resetForm(); // Reset form after submission
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <h2>{currentMember ? "Edit Member" : "Add New Member"}</h2>
      <label>Gym ID:</label>
      <input
        type="text"
        placeholder="Gym ID"
        value={gymId}
        onChange={(e) => setGymId(e.target.value)}
        required
      />

      <label>Name:</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Phone:</label>
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <label>Fees Date:</label>
      <input
        type="date"
        placeholder="Fees Date"
        value={feesDate}
        onChange={(e) => setFeesDate(e.target.value)}
        required
      />

      <label>Address:</label>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <label>Package Details:</label>
      <input
        type="text"
        placeholder="Package Details"
        value={packageDetails}
        onChange={(e) => setPackageDetails(e.target.value)}
        required
      />

      <label>Entry By:</label>
      <input
        type="text"
        placeholder="Entry By"
        value={entryBy}
        onChange={(e) => setEntryBy(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MemberForm;
