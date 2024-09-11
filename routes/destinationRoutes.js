import express from 'express';
import Destination from '../models/destination.js';

const router = express.Router();

// Página para listar destinos
router.get('/', async (req, res) => {
  const data = await Destination.readDestinationActivities();
  //const destinations = await Destination.read();
  console.log(data);
  res.render('destinations', { destinations: data });
});

// Página para criar um novo destino
router.get('/new', (req, res) => {
  res.render('destinationForm', { destination: null });
});

// Criar um novo destino
router.post('/new', async (req, res) => {
  const { name, description } = req.body;
  await Destination.create({ name, description });
  res.redirect('/destinations');
});

// Página para editar um destino
router.get('/edit/:id', async (req, res) => {
  const destination = await Destination.readById(req.params.id);
  res.render('destinationForm', { destination });
});

// Atualizar um destino
router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await Destination.update({ id, name, description });
  res.redirect('/destinations');
});

// Deletar um destino
router.get('/delete/:id', async (req, res) => {
  await Destination.remove(req.params.id);
  res.redirect('/destinations');
});

export default router;
