import express from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import generateId from '../src/utils/idGenerator.js';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

ViteExpress.config({ printViteDevServerHost: true });

const TEST_DATA = [
    { id: 0, description: 'Content plan', rate: 50, hours: 4 },
    { id: 1, description: 'Copy writing', rate: 50, hours: 2 },
    { id: 2, description: 'Website design', rate: 50, hours: 5 },
    { id: 3, description: 'Website development', rate: 100, hours: 5 },
]  

// Routes go here

app.get('/api/invoice', (req, res) => {
    res.json(TEST_DATA)
})

app.post('/api/invoice', (req, res) => {
    const { description, rate, hours } = req.body;
  
    const newItem = {
      id: generateId(),
      description: description || '',
      rate: Number(rate) || 0,
      hours: Number(hours) || 0,
    };
  
    TEST_DATA.push(newItem);
    res.json(newItem);
  });

  app.put('/api/invoice/:id', (req, res) => {
    const { id } = req.params;
    const { description, rate, hours } = req.body;
  
    const index = TEST_DATA.findIndex((item) => item.id === Number(id));
  
    if (index === -1) {
      res.status(404).json({ error: `Item with ID ${id} not found.` });
    } else {
      const item = TEST_DATA[index];
  
      item.description = description || item.description;
      item.rate = Number(rate) || item.rate;
      item.hours = Number(hours) || item.hours;
  
      res.json(item);
    }
  });

app.delete('/api/invoice/:id/delete', (req, res) => {
    const { id } = req.params;
    const index = TEST_DATA.findIndex((item) => item.id === Number(id));
    if (index === -1) {
      res.status(404).json({ error: `Item with ID ${id} not found.` });
    } else {
      TEST_DATA.splice(index, 1);
      res.json({ id: Number(id) });
    }
})

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));