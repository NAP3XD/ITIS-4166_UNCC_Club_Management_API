import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(morgan('tiny'));

app.use(express.json());

// API Documentation - Load bundled OpenAPI spec
try {
  const openapiSpec = JSON.parse(
    readFileSync(join(__dirname, '../docs/bundled/openapi.json'), 'utf8')
  );
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, {
    customSiteTitle: 'Club Management API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  }));
  console.log('📚 API Documentation available at http://localhost:' + PORT + '/api-docs');
} catch (error) {
  console.warn('⚠️  API documentation not available. Run "npm run docs:bundle" to generate it.');
}

// api routes go here
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  
  console.log(err.stack);
  if (!err.status) {
    console.log(err.stack);
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;


// instructions for branch management
// git switch -c <branch-name>          // create new branch
// git add .
// git commit -m "<comment>"

// git push -u origin <branch-name>       // push branch

// git switch main            // swith to main branch
// git pull                    // pull down changes to local machine
