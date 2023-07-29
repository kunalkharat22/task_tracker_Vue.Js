<template>
    <AddTask v-show="showAddTask" @add-task="addTask" />
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>

<script>
import Tasks from '../components/Tasks.vue'
import AddTask from '../components/AddTask.vue'
export default {
  name: 'Home',
  components: {
    Tasks,
    AddTask
  },
  props: {
    showAddTask: Boolean,
  },
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    async deleteTask(id) {
      if (confirm('Are you sure?')) {
        const res = await fetch(`/api/tasks/${id}`, {
          method: 'DELETE'
        })

        if (res.ok) {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        } else {
          alert("Error deleting task");
        }
      }
    },

    async toggleReminder(id) {
      const taskToToggle = this.tasks.find((task) => task.id === id);
      const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
      })

      if (res.ok) {
        const data = await res.json();
        this.tasks = this.tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task);
      } else {
        alert("Error updating task");
      }
    },

    async addTask(task) {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
      })

      if (res.ok) {
        const data = await res.json();
        this.tasks = [...this.tasks, data];
      } else {
        alert("Error adding task");
      }
    },

    async fetchTasks() {
      const res = await fetch('/api/tasks');

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        alert("Error fetching tasks");
        return [];
      }
    },

    async fetchTask(id) {
      const res = await fetch(`/api/tasks/${id}`);

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        alert("Error fetching task");
        return null;
      }
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  }
}
</script>