import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'; // CORS paketini import edin
import categoryRouter from './services/truckCategory/routes';
import priceRouter from './services/price/routes';
import orderRouter from './services/order/routes';

const app = express();
const prisma = new PrismaClient();

app.use(cors());

app.use(express.json());

// Main Routes
app.use('/api/category/', categoryRouter);
app.use('/api/price/', priceRouter);
app.use('/api/order/', orderRouter);

app.get('/health', (req: Request, res: Response) => {
  res.send('Server is healthy!');
});

app.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Could not create user' });
  }
});

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});