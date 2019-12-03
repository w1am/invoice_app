import express from 'express';
import Client from '../models/Client';

const customRouter = express.Router();

export const getClients = customRouter.get('/api/:id/clients', async (req, res) => {
    const id = req.params.id;
    const clients = await Client.find({ user: id });
    return res.json({
        confirmation: true,
        payload: clients
    })
})