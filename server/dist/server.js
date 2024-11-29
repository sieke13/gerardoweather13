import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.resolve(__dirname, '../../client/dist');
console.log(`Serving static files from: ${clientPath}`);
app.use(express.static(clientPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.get('*', (_req, res) => {
    const indexPath = path.resolve(clientPath, 'index.html');
    console.log(`Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error(`Error serving index.html: ${err}`);
            res.status(500).send(err);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Serving index.html from: ${path.resolve(clientPath, 'index.html')}`);
});
