require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const port= process.env.PORT||3000;

const usersRouter = require('./routers/users')
const authRouter = require('./routers/auth')
const articlesRouter = require('./routers/articles')
const commentsRouter = require('./routers/comments')

const app = express();
app.use(cors({
  origin: '*'
}))

app.use('/api', usersRouter)
app.use('/api', authRouter)
app.use('/api', articlesRouter)
app.use('/api', commentsRouter)

mongoose.connect(process.env.MONGOdb, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(3000,()=>{
  console.log(`connection successful at port ${port}`);
})
