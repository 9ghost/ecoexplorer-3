import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import destinationRoutes from './routes/destinationRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

const app = express();

// Configurando o template engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Configurar diretório público para arquivos estáticos
app.use(express.static(path.join(path.resolve(), 'public')));

// Middleware para parsing de dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Usar rotas
app.use('/destinations', destinationRoutes);
app.use('/activities', activityRoutes);

// Página inicial
app.get('/', (req, res) => {
  res.render('index', { title: 'Bem-vindo ao EcoExplorer' });
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
