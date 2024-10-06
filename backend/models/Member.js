const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    feesDate: { type: Date, required: true },
    address: { type: String, required: true },
    packageDetails: { type: String, required: true },
    entryBy: { type: String, required: true },
    gymId: { type: String, required: true } // Added gymId field
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
