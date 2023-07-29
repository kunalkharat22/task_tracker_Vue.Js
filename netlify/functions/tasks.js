// netlify/functions/tasks.js
const tasks = require('../../public/db.json').tasks;

exports.handler = async (event, context) => {
  const { httpMethod, body } = event;

  if (httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  } else if (httpMethod === 'POST') {
    const newTask = JSON.parse(body);
    newTask.id = tasks.length + 1;
    tasks.push(newTask);

    return {
      statusCode: 200,
      body: JSON.stringify(newTask),
    };
  } else if (httpMethod === 'PUT') {
    const updatedTask = JSON.parse(body);
    tasks.forEach((task, index) => {
      if (task.id === updatedTask.id) {
        tasks[index] = updatedTask;
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(updatedTask),
    };
  } else if (httpMethod === 'DELETE') {
    const taskId = JSON.parse(body).id;
    tasks = tasks.filter((task) => task.id !== taskId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Task deleted successfully.' }),
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Not found.' }),
  };
};
