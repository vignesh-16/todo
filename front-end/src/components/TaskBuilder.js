import React, { useState } from 'react';

const TaskBuilder = ({ show, onClose, onSave }) => {

    const [taskName, setTaskName] = useState('');

    const addTask = (e)=> {
        onSave();
        setTaskName('');
        onClose();
    }
    
    if (!show) return null;
    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className="close" onClick={onClose}>&times;</span>
                <form className="new-task-builder" onSubmit={ (e)=> { addTask(e) } }>
                    <input type="text" placeholder="Enter task title" value={taskName} required onChange={(e)=> { setTaskName(e.target.value)} } />
                    <fieldset>
                        <input type="checkbox" className="priority-selector" value={"bucket-list"} aria-label="bucket-list"></input>
                        <input type="checkbox" className="priority-selector" value={"low"} aria-label="low-priority"></input>
                        <input type="checkbox" className="priority-selector" value={"medium"} aria-label="medium-priority"></input>
                        <input type="checkbox" className="priority-selector" value={"high"} aria-label="high-priority"></input>
                        <input type="checkbox" className="priority-selector" value={"important"} aria-label="absolutely-required"></input>
                    </fieldset>
                    <div className="time-limit">
                        <input type="date" className="calendar" required></input>
                    </div>
                    <button type='submit' className='save-task-button'>Create Task</button>
                </form>
            </div>
        </div>
     );
}
 
export default TaskBuilder;
