const express = require('express')


const projects = [
  {
    id:"1",
    title:"Novo Projeto",
    tasks:[]
  },
  {
    id:"2",
    title:"Projeto 2",
    tasks:[]
  }
]

let countReq = 0;

const server = express()

server.use(express.json())



server.use((req,res,next)=>{
  console.log(`O número de requisições feitas é:${++countReq}`)
  console.count('contando o numero de requisições')
  next()
})

function verifyIfIDExists(req,res,next){
  const {id} = req.params
  const verifyID= projects.findIndex(project => project.id === id)
  if(verifyID === -1){
    return res.status(400).json({error:"the ID informed is not valid"})
  }
  next()
}

server.get('/projects',(req,res)=>{
  return res.json(projects)
})

server.post('/projects',(req,res)=>{
  const {id, title} = req.body
  projects.push({id,title,tasks:[]})
  return res.json(projects)
})

server.post('/projects/:id/tasks',verifyIfIDExists,(req,res)=>{
  const {id} = req.params
  const {title} = req.body
  const projectToAddTask = projects.findIndex(project => project.id === id)
  projects[projectToAddTask].tasks.push(title)
  return res.json(projects)

})


server.put('/projects/:id',verifyIfIDExists,(req,res)=>{
  const {title} = req.body
  const {id} = req.params
  const projectToBeUpdated = projects.findIndex(project => project.id === id)  
  projects[projectToBeUpdated].title = title
  return res.json()
})

server.delete('/projects/:id',verifyIfIDExists,(req,res)=>{
  const {id} = req.params
  const projectToBeDeleted = projects.findIndex(project => project.id === id)
  projects.splice(projectToBeDeleted,1)
  return res.json(projects)
})

server.listen(4000,()=>{
  console.log('The server is running')
})