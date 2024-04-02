import React, { useEffect, useState } from 'react';

const Todos = () => {
   
    const [tasks,setTasks]=useState([])
    const [task,setTask]=useState('')
    const [ajout,setajout]=useState(false);
    // charger les taches dans le localstorage lors du montage du composant
    useEffect(()=>{
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) { // Check for null
          setTasks(savedTasks);
        }
    },[])

    // sauvergarder les tavhes dans le localstorage lorsqu'ellles changent
    useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(tasks)) 
    },[tasks])

    const handlechange =(event)=>{
        setTask(event.target.value)
    
    }
    const handlesubmit =(event)=>{
        event.preventDefault()
        if(task.trim()){
            setTasks([...tasks,task]);
            console.log(tasks)
            setajout(true)
            setTask('')
            setTimeout(()=>{
                setajout(false)
            },1000)
        }
    }
    const handledelete =(index)=>{
        const newTasks =[...tasks];
        newTasks.splice(index,1)
        
        setTasks(newTasks)
    }
    return (
        <div>
            {/* <marquee behavior="scroll" direction="right" className="text-success fs-5">Bienvenue </marquee> */}
            <h1 className="text-secondary">Todo list</h1>
            { ajout ?  <div class="alert alert-success" role="alert">
  Une tâche a été ajouter 
</div> :""}
            <form onSubmit={handlesubmit}>
                <input type="text" value={task} onChange={handlechange} className='form-control'/>
                <button type='submit' className='btn btn-primary d-block mt-3'>Ajouter</button>
            </form>

            <ul className='list-group list-group-flush d-flex justify-content-between mt-3'>
                {tasks.map((task,index)=>(
                    <li key={index} className='list-group-item d-flex justify-content-between'>
                        {task}
                        <button onClick={()=>{handledelete(index)}} className='btn btn-danger'>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todos;
