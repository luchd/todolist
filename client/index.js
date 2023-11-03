document.addEventListener('DOMContentLoaded', () => {
    const clickMeBtn = document.getElementById('btn');
    const appDiv = document.getElementById('app');
    clickMeBtn.addEventListener('click', () => {
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then(data => {
            console.log('data from server: ', data);
            for(const task of data) {
                const taskDiv = document.createElement('div');
                taskDiv.innerText = task.id;
                appDiv.appendChild(taskDiv);
            }
        })
        .catch(err => {
            console.log('error: ', err.message);
        });
    });
});