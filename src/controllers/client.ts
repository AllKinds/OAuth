import { Client } from '../models/client';

export class ClientController {
    
    getClients(req, res) {
        Client.find({ userId: req.user.id }, (err, clients) => {
            if(err) return res.send(err);
            res.json(clients);
        });
    }

    postClients(req, res) {
        let client = new Client({
            name: req.body.name,
            id: req.body.id,
            secret: req.body.secret,
            userId: req.user.id
        });

        client.save((err) => {
            if(err) return res.send(err);
            res.json({ message: 'Client added to the server!', data: client});
        });
    }
}