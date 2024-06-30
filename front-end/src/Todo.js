import { useEffect, useRef } from 'react';
import { useState } from 'react';
import useFetch from './useFetch';
import usePost from './usePost';
import useDelete from './useDelete';

const Todo = () => {
    const taskInput = useRef(null)
    const [taskExists, setTaskExits] = useState(false);
    const { data : tasks, setData : setTasks, isLoading, serverError } = useFetch('http://localhost:3003/api/tasks/getTasks');
    const postMethod = usePost('http://localhost:3003/api/tasks/addTask');
    const deleteCall = useDelete('http://localhost:3003/api/tasks/delete');
    const addTask = async (e)=> {
        e.preventDefault();
        setTaskExits(false);
        console.log('These are the default tasks: ',tasks)
        console.log(`Here's the value: `,taskInput.current.value);
        if(!taskInput.current.value) {
            return;
        } 
        let newTaskValue = taskInput.current.value;
        tasks.forEach((task)=>{
            if(task.value === newTaskValue) {
                setTaskExits(true);
            } 
        })
        if(! taskExists) {
            const newTask = { value: newTaskValue, isCompleted: false, isSelected: false };
            let response = await postMethod(newTask);
            if(response.value === newTaskValue) {
                setTasks([...tasks, newTask]);
            } else {
                console.log('%c Warn: Something went wrong!',response);
            }
            taskInput.current.value = '';
        }
        console.log('These are the updated tasks: ',tasks)
    }
    const markCompleted = ()=>{
        const updatedTasks = tasks.map((task)=>{
            if(task.isSelected) {
                task.isCompleted = true;
                task.isSelected = false;
            }
            return task;
        })
        setTasks(updatedTasks);
    }
    const deleteSelected = (e)=> {
        e.preventDefault();
        const updatedTasks = []
        const forDelete = [];
        console.log('Current tasks: ',tasks)
        tasks.forEach((task)=>{
            if(! task.isSelected) {
                updatedTasks.push(task)
            } else {
                forDelete.push(task)
            }
        });
        deleteCall(forDelete);
        setTasks(updatedTasks);
    }
    const taskSelected = (e, taskId)=> {
        e.preventDefault();
        ;
        let updatedTasks = tasks.map((task)=>{
            console.log('taskId: ',taskId+' task: ',task);
            if(task._id === taskId) {
                return { ...task, isSelected: !task.isSelected };
            }
            return task;
        })
        console.log('These tasks are now selected by user: ',updatedTasks);
        setTasks(updatedTasks);
    }
    useEffect(()=> {
        console.log('Tasks are updated : ',tasks);
    },[tasks])
    return (
        <section className="Todo-app">
            <h2>Your Tasks</h2>
            <div className="add-task">
                <input type="text" placeholder="Enter a task" ref={taskInput}></input>
                <button onClick={(e)=>addTask(e)} >Add</button>
                <button onClick={()=>markCompleted()} >Done</button>
                <button onClick={(e)=>{ console.log('Event recieved',e); deleteSelected(e) }} >Delete</button>
            </div>

            <div className='tasks-container'>
            { isLoading && <div>Please wait..</div> }
            { serverError && <div>Error Retriving data</div> }
            {
                tasks && 
                tasks.map((task)=> (
                    <div className="task" key={task._id}>
                        <input type="checkbox" onClick={(e)=>taskSelected(e, task._id)} checked={task.isSelected}></input>
                        <span className={task.isCompleted ? 'completed': ''}>{task.value}</span>
                    </div>
                ))
            }
        </div>
        </section>
    );
}
 
export default Todo;