const express=require('express');
const mongoose=require('mongoose');
const medicine=require('./models/medicine.js');
//express app
const app=express();

//connect to MongoDB and listen for requests
//ADD DBURI
mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(3000))
.catch(err => console.log("Error in database connection",err));


//setting the view engine
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.redirect('/home');
});

app.get('/home',(req,res) =>{
    medicine.find().sort({createdAt: 1})
        .then((result)=>{
            //console.log(result);
            res.render('home',{medicines: result});
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.post('/home',(req,res)=>{
    const drug = new medicine(req.body);
    drug.save()
        .then((result)=>{
            console.log('Medicine Added');
            res.redirect('/home');
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.get('/home/delete/:id',(req,res)=>{
    const id = req.params.id;
    medicine.findByIdAndDelete(id)
    .then((result)=>{
        console.log('Medicine Deleted');
        res.redirect('/home');
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/add-medicine',(req,res)=>{
    res.render('add-medicine');
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.use((req,res)=>{
    res.status(404).render('404');
});