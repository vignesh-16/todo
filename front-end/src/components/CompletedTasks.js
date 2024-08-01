import useFetch from "../customhooks/useFetch";
import useDelete from "../customhooks/useDelete";
import usePut from "../customhooks/usePut";

const CompletedTasks = () => {
    const userId = sessionStorage.getItem('userId');
    const { data : tasks, setData : setTasks, isLoading, serverError } = useFetch(`http://localhost:3003/api/tasks/getCompletedTasks/${userId}`);
    const deleteCall = useDelete('http://localhost:3003/api/tasks/delete');
    const updateCall = usePut('http://localhost:3003/api/tasks/markCompleted');

    const markCompleted = ()=>{
        let markCompleted = [];
        const updatedTasks = tasks.map((task)=>{
            if(task.isSelected) {
                task.isCompleted = false;
                task.isSelected = false;
                markCompleted.push(task);
            }
            return task;
        })
        let res = updateCall(markCompleted);
        console.log(res)
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
        const updatedTasks = tasks.map((task)=>{
            if(task._id === taskId) {
                task.isSelected = !task.isSelected;
            }
            return task;
        })
        setTasks(updatedTasks);
    }

    return (
        <section className="Todo-app">
            <h2>Completed Tasks</h2>
            <div className='tasks-container'>
                { isLoading && <div>Please wait..</div> }
                { serverError && <div>Error Retriving data</div> }
                {
                    tasks && 
                    tasks.map((task)=> (
                        <div className="task" key={task._id}>
                            <input type="checkbox" onChange={(e)=>taskSelected(e, task._id)} checked={task.isSelected}></input>
                            <span className={task.isCompleted ? 'completed': ''}>{task.value}</span>
                            { 
                                task.isSelected && 
                                <span className='task-status-options'>
                                    <button onClick={()=>markCompleted()}>Move to Todo</button>
                                    <button onClick={(e)=>{ deleteSelected(e) }}>Delete</button>
                                </span>
                            }
                        </div>
                    ))
                }
            </div>
        </section>
     );
}
 
export default CompletedTasks;