import express from 'express';
import cors from 'cors';
const app = express();
const port = 3001;
app.use(cors());
app.get('/repos', async (req, res) => {
    try {
        const response = await fetch("https://api.github.com/users/freeCodeCamp/repos", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        const result = data.filter((d: any) => !d.fork && d.forks > 5)
        console.log({ result });


        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch repos' });
    }
});

app.listen(port, () => {
    return console.log(`Listening at http://localhost:${port}`);
});