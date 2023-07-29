// functions/tasks.js

let tasks = [
  // Your existing tasks data from db.json or an empty array
];

// Function to generate a unique ID for new tasks
function generateId() {
  return Math.max(...tasks.map((task) => task.id), 0) + 1;
}

// Serverless function to get all tasks
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(tasks),
  };
};

// Serverless function to get a single task by ID
exports.handler = async (event, context) => {
  // Extract the task ID from the request parameters
  const id = parseInt(event.queryStringParameters.id);

  // Find the task with the specified ID
  const task = tasks.find((task) => task.id === id);

  // Return the task if found, or a 404 status if not found
  if (task) {
    return {
      statusCode: 200,
      body: JSON.stringify(task),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Task not found' }),
    };
  }
};

// Serverless function to create a new task
exports.handler = async (event, context) => {
  // Parse the request body to get the new task data
  const newTask = JSON.parse(event.body);
  newTask.id = generateId(); // Assign a unique ID to the new task

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Return the new task with a 201 status code
  return {
    statusCode: 201,
    body: JSON.stringify(newTask),
  };
};

// Serverless function to update an existing task by ID
exports.handler = async (event, context) => {
  // Extract the task ID from the request parameters
  const id = parseInt(event.queryStringParameters.id);

  // Parse the request body to get the updated task data
  const updatedTask = JSON.parse(event.body);

  // Find the index of the task with the specified ID
  const index = tasks.findIndex((task) => task.id === id);

  // Update the task if found, or return a 404 status if not found
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    return {
      statusCode: 200,
      body: JSON.stringify(tasks[index]),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Task not found' }),
    };
  }
};

// Serverless function to delete a task by ID
exports.handler = async (event, context) => {
  // Extract the task ID from the request parameters
  const id = parseInt(event.queryStringParameters.id);

  // Filter out the task with the specified ID and update the tasks array
  tasks = tasks.filter((task) => task.id !== id);

  // Return a 200 status code
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Task deleted successfully' }),
  };
};
