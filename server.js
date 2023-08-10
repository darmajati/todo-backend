require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const passport = require('./lib/passport');
app.use(passport.initialize());

const router = require('./routes/homeRouter');
const authRouter = require('./routes/authRouter');
const todoRouter = require('./routes/todoRouter');

app.use(router);
app.use('/auth', authRouter);
app.use('/todo', passport.authenticate('jwt', { session: false }), todoRouter);

app.listen(PORT, () => {
  console.log(`server berjalan di port http://localhost:${PORT}`);
});
