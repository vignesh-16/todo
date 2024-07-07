import useFetch from "./useFetch";

const CompletedTasks = () => {
    const { data : tasks, setData : setTasks, isLoading, serverError } = useFetch('http://localhost:3003/api/tasks/getCompletedTasks');

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
                        </div>
                    ))
                }
            </div>
        </section>
     );
}
 
export default CompletedTasks;