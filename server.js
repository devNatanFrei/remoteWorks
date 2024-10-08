const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

mongoose.connect('mongodb://localhost:27017/remotework', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connect'))
.catch(err => console.log('Err connected'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const jobSchema = new mongoose.Schema({
    name_company: String,
    type_of_employment: String,
    qualifications: String,
    description: String,
    benefits: String,
    salary: String
});

const Job = mongoose.model('Job', jobSchema);
const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => { 
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();
    } catch (err) {
        console.error('Error no Mongo', err);
        res.status(500).json({ error: 'Error no Mongo', details: err });
    }
});

app.post('/cadastrar', async (req, res) => {
    try {
        const newJob = new Job({
            name_company: req.body.name_company,
            type_of_employment: req.body.type_of_employment,
            qualifications: req.body.qualifications,
            description: req.body.description,
            benefits: req.body.benefits,
            salary: req.body.salary
        });
        
        await newJob.save();
    } catch (err) {
        console.error('Error no Mongo', err);
        res.status(500).json({ error: 'Error no Mongo', details: err });
    }
});



app.get('/jobs', async (req, res) =>{
    try{
        const jobs = await Job.find()
        res.json(jobs)
    }catch (err){
        console.error('Erro ao buscar vagas de trabalho:', err)
        res.status(500).json({ error: 'Erro ao buscar vagas de trabalho' })
    }


})




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


