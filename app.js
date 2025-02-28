const express = require('express');
const data= require("./task.json");

const app = express();
const port = 3000;

const tasks=data["tasks"];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/tasks",(req,res)=>{
    res.send(tasks);
});

app.get("/tasks/:id",(req,res)=>{
    const id=req.params.id;
    const task=tasks.find((task)=>{
        return task.id===parseInt(id);
    })
    if(!task){
        return res.status(404).send("non-existent task IDs")
    }
    res.send(task)
})

app.post("/tasks",(req,res)=>{
    const task=req.body;

    if(task.title!="" && task.description!="" && (task.completed===true || task.completed===false)){
        task.id=tasks.length+1;
        tasks.push(task);  
    }
    else{
        return res.status(400).send("invalid input")
    }
    res.status(201).send(task)
    
    

})

app.put("/tasks/:id",(req,res)=>{

    const id=req.params.id;
    const task=tasks.find((task)=>{
        return task.id===parseInt(id);
    })
    if(!task){
        return res.status(404).send("non-existent task IDs")
    }
    const updatedTask=req.body;
    if(updatedTask.title!="" && updatedTask.description!="" && (updatedTask.completed===true || updatedTask.completed===false)){
        task.title=updatedTask.title;
        task.description=updatedTask.description;
        task.completed=updatedTask.completed
    }
    else{
        return res.status(400).send("invalid input")
    }     
    res.send(task)
})

app.delete("/tasks/:id",(req,res)=>{
    const id=req.params.id;
    const task=tasks.find((task)=>{
        return task.id===parseInt(id);
    })
    if(!task){
        return res.status(404).send("non-existent task IDs")
    }
    const index=tasks.indexOf(task);

    tasks.splice(index,1);

    res.send(tasks);
})


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;