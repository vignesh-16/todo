import React, { useState } from 'react';
import { AddMonthsToDate } from '../utils/utility';

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
            <span className="close" onClick={onClose}>&times;</span>
            <div className='modal-content'>
                <form className="new-task-builder" onSubmit={ (e)=> { addTask(e) } }>
                    <div className="data-parent title-holder">
                        <input type="text" className='' placeholder="Enter task title" value={taskName} required onChange={(e)=> { setTaskName(e.target.value)} } />
                    </div>
                    <div className="data-parent priorities-holder">
                        <span className='bucketlist-holder'>
                            <input type="checkbox" className="bucket-list" value={"bucket-list"} aria-label="bucket-list"></input>
                            Bucket List
                        </span>
                        <fieldset>
                            <span className='options-holder'>
                                <input type='radio' id='low' name='priority' value={'low'} aria-label="low-priority"></input>
                                <label htmlFor='low'>Low</label>
    
                                <input type='radio' id='medium' name='priority' value={'medium'} aria-label="medium-priority"></input>
                                <label htmlFor='medium'>Medium</label>
                            
                                <input type='radio' id='high' name='priority' value={'high'} aria-label="high-priority"></input>
                                <label htmlFor='high'>High</label>
                            
                                <input type='radio' id='important' name='priority' value={'important'} aria-label="necessary task"></input>
                                <label htmlFor='important'>Important</label>
                            </span>
                        </fieldset>
                    </div>
                    <div className="data-parent time-limit">
                        <input type="date" className="calendar" min={new Date()?.toISOString()?.slice(0, 10)} max={ AddMonthsToDate(3) } required></input>
                    </div>
                    <button type='submit' className='save-task-button'>Create Task</button>
                </form>
            </div>
        </div>
     );
}
 
export default TaskBuilder;
