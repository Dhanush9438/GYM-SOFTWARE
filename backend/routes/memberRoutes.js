const express = require('express');
const Member = require('../models/Member');

const router = express.Router();

// Get all members
router.get('/', async (req, res) => {
    console.log('GET /members');
    try {
        const members = await Member.find();
        console.log(`Retrieved ${members.length} members`);
        res.json(members);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});

// Create a new member
router.post('/add', async (req, res) => {
    console.log('POST /members', req.body);
    const member = new Member(req.body);
    try {
        const savedMember = await member.save();
        console.log('Member created:', savedMember);
        res.status(201).json(savedMember);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
});

// Update a member
router.put('/:id', async (req, res) => {
    console.log(`PUT /members/${req.params.id}`, req.body);
    try {
        const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Member updated:', updatedMember);
        res.json(updatedMember);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
});

// Delete a member
router.delete('/:id', async (req, res) => {
    console.log(`DELETE /members/${req.params.id}`);
    try {
        await Member.findByIdAndDelete(req.params.id);
        console.log('Member deleted successfully');
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

