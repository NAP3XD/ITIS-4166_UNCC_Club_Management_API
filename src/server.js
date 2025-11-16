import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import clubRoutes from './routes/clubRoutes.js';
// import eventRoutes from './routes/eventRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(morgan('tiny'));

app.use(express.json());

// api routes go here
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/clubs', clubRoutes);
// app.use('/api/events', eventRoutes);
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
