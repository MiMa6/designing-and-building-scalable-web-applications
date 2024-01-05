<script>
  import TaskInput from "../components/TaskInput.svelte";
  let tasks = [];

  const addTask = (task) => {
    tasks = [task, ...tasks];
  }
</script>

<h1>Tasks</h1>

<p>Total tasks: {tasks.length}</p>

<TaskInput addTask={addTask} />