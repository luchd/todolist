document.addEventListener('DOMContentLoaded', () => {
    let toggleEditBtn = true;
    const addTaskBtn = document.getElementById('addTaskBtn');
    const appDiv = document.getElementById('app');
    fetch('/api')
    .then(data => data.json())
    .then(data => {
        console.log('data from server: ', data);
        for(const task of data) {
            const taskDiv = document.createElement('div');
            const editBtn = document.createElement('button');
            editBtn.setAttribute('content', 'Edit');
            editBtn.innerHTML = 'Edit';
            const removeBtn = document.createElement('button');
            removeBtn.setAttribute('content', 'Remove');
            removeBtn.innerHTML = 'Remove';
            taskDiv.classList.add('taskItem');
            taskDiv.setAttribute('id', task.id);
            const taskSpan = document.createElement('span');
            taskSpan.innerText = task.name;
            editBtn.addEventListener('click', (e) => {
                console.log(e.target.parentNode);
                const parentNode = e.target.parentNode;
                const parentId = parentNode.id;
                const taskName = parentNode.querySelector('span');
                const oldTaskName = taskName.innerText;
                console.log('taskName from <span>: ', taskName);
                taskName.contentEditable = 'true';
                const range = document.createRange();
                range.selectNodeContents(taskSpan);
                const windowSelection = window.getSelection();
                if(toggleEditBtn) {
                    // taskSpan.classList.add('selectingTask');
                    windowSelection.removeAllRanges();
                    windowSelection.addRange(range);
                    e.target.innerHTML = 'Save';
                }
                else {
                    console.log('parentId: ', parentId);
                    // taskSpan.classList.remove('selectingTask');
                    windowSelection.removeAllRanges();
                    // Update the updated task to database
                    if(oldTaskName !== taskName.innerText) {
                        const updatedTaskName = {
                            updatedTaskName: taskName.innerText
                        }
                        fetch(`/api/${parentId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedTaskName)
                        })
                        .then(data => data.json())
                        .then(data => {
                            console.log('data after updating a task: ', data);
                        })
                        .catch(err => {
                            console.log('something went wrong when updating task: ', err.message);
                        });
                    }
                    e.target.innerHTML = 'Edit';
                }
                toggleEditBtn = !toggleEditBtn;
            })
            removeBtn.addEventListener('click', (e) => {
                const parentNode = e.target.parentNode.parentNode;
                const childNode = e.target.parentNode;
                const parentId = childNode.id;
                fetch(`/api/${parentId}`, {
                    method: 'DELETE'
                })
                .then(data => data.json())
                .then(data => {
                    console.log('data after deleting a task: ', data);
                })
                .catch(err => {
                    console.log('something went wrong while deleting task: ', err.message);
                });
                // Update UI
                parentNode.removeChild(childNode);
            });
            taskDiv.appendChild(taskSpan);
            taskDiv.appendChild(editBtn);
            taskDiv.appendChild(removeBtn);
            appDiv.appendChild(taskDiv);
        }
    })
    .catch(err => {
        console.log('error: ', err.message);
    });
    
    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const taskNameInput = document.querySelector('#newTaskName');
        const taskNameValue = taskNameInput.value;
        taskNameInput.value = '';
        if(taskNameValue) {
            const newTask = {
                taskName: taskNameValue
            }
            fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
            .then(data => data.json())
            .then(data => {
                // Update UI
                const task = data;
                const taskDiv = document.createElement('div');
                const editBtn = document.createElement('button');
                editBtn.setAttribute('content', 'Edit');
                editBtn.innerHTML = 'Edit';
                const removeBtn = document.createElement('button');
                removeBtn.setAttribute('content', 'Remove');
                removeBtn.innerHTML = 'Remove';
                taskDiv.classList.add('taskItem');
                taskDiv.setAttribute('id', task.id);
                const taskSpan = document.createElement('span');
                taskSpan.innerText = task.name;
                editBtn.addEventListener('click', (e) => {
                    console.log(e.target.parentNode);
                    const parentNode = e.target.parentNode;
                    const parentId = parentNode.id;
                    const taskName = parentNode.querySelector('span');
                    const oldTaskName = taskName.innerText;
                    console.log('taskName from <span>: ', taskName);
                    taskName.contentEditable = 'true';
                    const range = document.createRange();
                    range.selectNodeContents(taskSpan);
                    const windowSelection = window.getSelection();
                    if(toggleEditBtn) {
                        // taskSpan.classList.add('selectingTask');
                        windowSelection.removeAllRanges();
                        windowSelection.addRange(range);
                        e.target.innerHTML = 'Save';
                    }
                    else {
                        console.log('parentId: ', parentId);
                        // taskSpan.classList.remove('selectingTask');
                        windowSelection.removeAllRanges();
                        // Update the updated task to database
                        if(oldTaskName !== taskName.innerText) {
                            const updatedTaskName = {
                                updatedTaskName: taskName.innerText
                            }
                            fetch(`/api/${parentId}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(updatedTaskName)
                            })
                            .then(data => data.json())
                            .then(data => {
                                console.log('data after updating a task: ', data);
                            })
                            .catch(err => {
                                console.log('something went wrong when updating tasks: ', err.message);
                            });
                        }
                        e.target.innerHTML = 'Edit';
                    }
                    toggleEditBtn = !toggleEditBtn;
                })
                taskDiv.addEventListener('click', (e) => {
                    console.log('e.target: ', e.target.id);
                });
                taskDiv.appendChild(taskSpan);
                taskDiv.appendChild(editBtn);
                taskDiv.appendChild(removeBtn);
                appDiv.appendChild(taskDiv);
            })
            .catch(err => {
                console.log('something went wrong while adding a new task');
            });
        }
    });
});