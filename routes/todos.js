const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');


//get routes starts here
router.get('/', (req, res)=> {
    Todo.find({})
        .then(todos => {
            res.render('index', {todos : todos});
        })
        .catch(err=> {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        })
    
});

router.get('/todo/new', (req,res)=> {
    res.render('new');
});

router.get('/todo/search', (req,res)=> {
    res.render('search', {todo:""});
});

router.get('/todo', (req,res)=> {
    let searchName = req.query.name;

    Todo.findOne({name:{$regex: new RegExp('^'+searchName+'.*','i')}})
        .then(todo => {
            res.render('search', {todo:todo});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

router.get('/todo/filter', (req,res)=> {
    res.render('filter', {todo:""});
});

router.get('/todo/fltr', (req,res)=> {
    let filterQuery = req.query.status;
    Todo.findOne({status:{$regex: new RegExp('^'+filterQuery+'.*','i')}})    
        .then(todo => {
            res.render('filter', {todo:todo});
            console.log(todo);
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});


router.get('/edit/:id', (req, res)=> {

    let searchQuery = {_id : req.params.id};
    Todo.findOne(searchQuery)
        .then(todo => {
            res.render('edit', {todo:todo});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

//get routes ends here


//post routes starts here
router.post('/todo/new', (req,res)=> {
    let newTodo = {
        name : req.body.name,
        status : req.body.status
    };

    Todo.create(newTodo)
        .then(todo => {
            req.flash('success_msg', 'Task added to database successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//post routes end here

//put routes starts here

router.put('/edit/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    Todo.updateOne(searchQuery, {$set: {
        name : req.body.name,
        status : req.body.status      
    }})
    .then(todo => {
        req.flash('success_msg', 'Task updated successfully.')
        res.redirect('/');
    })
    .catch(err => {
        req.flash('error_msg', 'ERROR: '+err)
        res.redirect('/');
    });
});

//put routes ends here


//delete routes starts here
router.delete('/delete/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    Todo.deleteOne(searchQuery)
        .then(todo=>{
            req.flash('success_msg', 'Task deleted successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//delete routes ends here
module.exports = router;