import express from 'express';
import Activity from '../models/activity.js';
import Destination from '../models/destination.js';
const router = express.Router();

// Página para listar atividades de um destino
router.get('/:destinationId', async (req, res) => {
  const destination = await Destination.readById(req.params.destinationId);
  const activities = await Activity.read(req.params.destinationId);
  res.render('activities', { activities,destination,destinationId: req.params.destinationId });
});

// Página para criar uma nova atividade
router.get('/new/:destinationId', async (req, res) => {
  const activity = await Activity.readById(req.params.id);
  res.render('activityForm', { activity, destinationId: req.params.destinationId });
});

// Criar nova atividade
router.post('/new', async (req, res) => {
  const { name, destinationId } = req.body;
  await Activity.create({ name, destination_id: destinationId });
  res.redirect(`/activities/${destinationId}`);
});

// Página para editar uma atividade
router.get('/edit/:id/:destinationId', async (req, res) => {
  const activity = await Activity.readById(req.params.id);
  res.render('activityForm', { activity, destinationId: req.params.destinationId });
});

// Atualizar uma atividade
router.post('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, destinationId } = req.body;
    await Activity.update({ id, name });
    res.redirect(`/activities/${destinationId}`);
  } catch (error) {
    res.status(500).send('Erro ao atualizar atividade');
  }
});

// Deletar uma atividade
router.get('/delete/:id/:destinationId', async (req, res) => {
  await Activity.remove(req.params.id);
  res.redirect(`/activities/${req.params.destinationId}`);
});

export default router;