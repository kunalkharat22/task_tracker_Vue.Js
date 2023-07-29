// netlify/functions/tasks.js
const tasks = {
  "tasks": [
    {
      "id": 1,
      "text": "update programs",
      "day": "june 28th at 11:00am",
      "reminder": true
    },
    {
      "id": 2,
      "text": "call vuejs contactor",
      "day": "june 27th at 10:30am",
      "reminder": true
    },
    {
      "id": 3,
      "text": "update resume",
      "day": "june 25th at 1:00pm",
      "reminder": false
    }
  ]
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  } else if (event.httpMethod === 'POST') {
    const newTask = JSON.parse(event.body);
    tasks.push(newTask);
    return {
      statusCode: 201,
      body: JSON.stringify(newTask),
    };
  } else if (event.httpMethod === 'PUT') {
    const updatedTask = JSON.parse(event.body);
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      return {
        statusCode: 200,
        body: JSON.stringify(updatedTask),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Task not found' }),
      };
    }
  } else if (event.httpMethod === 'DELETE') {
    const taskId = event.path.split('/').pop();
    const index = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (index !== -1) {
      const deletedTask = tasks.splice(index, 1)[0];
      return {
        statusCode: 200,
        body: JSON.stringify(deletedTask),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Task not found' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }
};