import path from 'node:path'; // this imports the path node.js module to use in my code
import { fileURLToPath } from 'node:url'; // this imports the fileurltopath functionality from the node:url module to use in my code
import { Router } from 'express'; // this imports the router functionality from the express framework package to use in my code
const __filename = fileURLToPath(import.meta.url); // this creates a constant variable called __filename which contains the current filepath
const __dirname = path.dirname(__filename); // this creates a constant variable called __dirname which contains the current directory this file is in
const router = Router(); // this sets the constant variable router to use the Router function imported from the express framework package

// TODO: Define route to serve index.html
router.get('/', (_req, res) => {
    const indexPath = path.join(__dirname, '../../../client/dist/index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error(`Error serving index.html: ${err.message}`);
            res.status(500).send('Failed to load the application.');
        }
    });
});

export default router;