import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { exCalculator } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const height: any = req.query.height;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const weight: any = req.query.weight;
    res.send(calculateBmi(height, weight));
});

app.post('/exercise', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {exercises}: any = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {target}: any = req.body; 

    if(!exercises || !target) {
        return res.status(400).json({
            error: 'parameters missing'        
        });
    } else if(!Array.isArray(exercises) || typeof exercises[0] !== "number"
    ||typeof target !== "number") {
        return res.status(400).json({
            error:'malformatted parameters'
        });
    } else {
        const newWeek = exCalculator(exercises, target);
        return res.json(newWeek);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});