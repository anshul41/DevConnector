const connectDB= require('./config/db');

const express=require('express');
const cors=require('cors');
const app=express();
connectDB();

app.use(express.json({extended:true}));
app.use(cors());
app.get('/',(req,res) => res.send("Api running"));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));