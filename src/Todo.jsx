import React, { useState } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editTodoId, setEditTodoId] = useState(null);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleAddTodo = () => {
    if (taskName.trim() === '') return; // 1. Check if the task name is empty or consists only of whitespace characters
    const newTodo = { // 2. Create a new todo object
      id: Math.random(), // 3. Generate a unique ID for the new todo using Math.random()
      taskName, // 4. Assign the taskName from the state variable to the new todo
      description, // 5. Assign the description from the state variable to the new todo
      status // 6. Assign the status from the state variable to the new todo
    };
    setTodos([...todos, newTodo]); // 7. Add the new todo to the existing todos array and update the state with the new array
    setTaskName(''); // 8. Reset the taskName state variable to an empty string
    setDescription(''); // 9. Reset the description state variable to an empty string
    setStatus('Not Completed'); // 10. Reset the status state variable to 'Not Completed'
  };

  const handleEditTodo = (todoId) => {
    setEditTodoId(todoId); // 1. Set the state variable editTodoId to the ID of the todo being edited
    const todoToEdit = todos.find((todo) => todo.id === todoId); // 2. Find the todo object with the given todoId
    setTaskName(todoToEdit.taskName); // 3. Set the taskName state variable to the taskName of the todo being edited
    setDescription(todoToEdit.description); // 4. Set the description state variable to the description of the todo being edited
    setStatus(todoToEdit.status); // 5. Set the status state variable to the status of the todo being edited
  };

  const handleSaveEdit = () => {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === editTodoId) { // 1. Check if the todo's ID matches the ID of the todo being edited
      return { // 2. If the todo is the one being edited, create a new todo object with the updated values
        ...todo, // 3. Spread the properties of the existing todo
        taskName, // 4. Update the taskName property with the new value from the state variable
        description, // 5. Update the description property with the new value from the state variable
        status // 6. Update the status property with the new value from the state variable
      };
    }
    return todo; // 7. Return the existing todo unchanged if it is not the one being edited
  });
  setTodos(updatedTodos); // 8. Update the todos state variable with the updated array of todos
  setEditTodoId(null); // 9. Reset the editTodoId state variable to null to indicate that no todo is being edited
  setTaskName(''); // 10. Reset the taskName state variable to an empty string
  setDescription(''); // 11. Reset the description state variable to an empty string
  setStatus('Not Completed'); // 12. Reset the status state variable to 'Not Completed'
};

const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id); // 1. Filter out the todo with the given ID
    setTodos(updatedTodos); // 2. Update the todos state variable with the filtered array
};

  return (
    <>
      <div className='title'>MY TODO</div>
      <form>
        <div className='flexbox'>
          <div className='form-group'>
            <input type='text' className='formcnt' placeholder='Todo Name' value={taskName} onChange={handleTaskNameChange} />
          </div>
          <div className='form-group'>
            <input type='text' className='formcnt' placeholder='Todo Description' value={description} onChange={handleDescriptionChange} />
          </div>
          <div className='form-group'>
            <select className='formcnt' value={status} onChange={handleStatusChange}>
              <option value='Not Completed'>Not Completed</option>
              <option value='Completed'>Completed</option>
            </select>
          </div>
          {editTodoId ? (<button type='button' className='button btn-primary' onClick={handleSaveEdit}> SAVE EDIT </button>) : 
          (<button type='button' className='button btn-success' onClick={handleAddTodo}> ADD TODO </button>)}
        </div>
      </form>
      <div className='filtername'>Filter by Status:</div>
      <div className="filteropt">
      <select value={filterStatus} onChange={handleFilterChange} className='sltcol'>
        <option value='All'>All</option>
        <option value='Not Completed'>Not Completed</option>
        <option value='Completed'>Completed</option>
      </select>
      </div>
      

      <div className='title'>My Todos</div>
      <div className='newcard'>
      {/* Display todos based on filter */}
      {todos.filter((todo) => {
          if (filterStatus === 'All') return true;
          return todo.status === filterStatus;})
        .map((todo) => (
            <div key={todo.id} className='card'>
            <div className='card-body'>
              <div className='tname'>NAME: {editTodoId === todo.id ? <input value={taskName} onChange={handleTaskNameChange} /> : todo.taskName}</div>
              <div className='tdes'>DESCRIPTION: {editTodoId === todo.id ? <input value={description} onChange={handleDescriptionChange} /> : todo.description}</div>
              <div className='tst'>STATUS: {editTodoId === todo.id ? <select value={status} onChange={handleStatusChange} className='tsst'>
                <option value='Not Completed'><div>Not Completed</div></option>
                <option value='Completed'><div>Completed</div></option>
              </select> : todo.status}</div>
              <div className='btns'>  {editTodoId === todo.id ? null : <button className='button btn-success' onClick={() => handleEditTodo(todo.id)}>EDIT</button>}
              <button className='button btn-danger' onClick={() => handleDeleteTodo(todo.id)}>DELETE</button>  </div>
             
            </div>
            </div>
             
        ))}
        </div>
    </>
  );
};

export default Todo;
