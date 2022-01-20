function setTrueDate(origin_tasks) {
  const currentDate = new Date();
  var real_tasks=[]
  for (let i = 0; i < origin_tasks.length; i++) {
    const task = origin_tasks[i];
    var start=task.start+1
    var end=task.end+1
    task.start=new Date(currentDate.getFullYear(), currentDate.getMonth(), start)
    task.end=new Date(currentDate.getFullYear(), currentDate.getMonth(), end)
    real_tasks.push(task)
  }
  console.log("line 132", real_tasks)
  return real_tasks
}

export function initTasks() {
  const origin_tasks=[{'start': 0, 'end': 5, 'name': 'Machine 0', 'id': 'Machine 0', 'progress': 100, 'type': 'project', 'hideChildren': false}, {'start': 0, 'end': 2, 'name': 'job_1 task_0', 'id': 'job_1|task_0', 'job_name': 'job_1', 'progress': 100, 'type': 'task', 'project': 'Machine 0', 'styles': {'progressColor': ['#FF4495'], 'progressSelectedColor': ['#FF4495']}}, {'start': 2, 'end': 5, 'name': 'job_0 task_0', 'id': 'job_0|task_0', 'job_name': 'job_0', 'progress': 100, 'type': 'task', 'project': 'Machine 0', 'styles': {'progressColor': ['#FF7AA5'], 'progressSelectedColor': ['#FF7AA5']}}, {'start': 0, 'end': 11, 'name': 'Machine 1', 'id': 'Machine 1', 'progress': 100, 'type': 'project', 'hideChildren': false}, {'start': 0, 'end': 4, 'name': 'job_2 task_0', 'id': 'job_2|task_0', 'job_name': 'job_2', 'progress': 100, 'type': 'task', 'project': 'Machine 1', 'styles': {'progressColor': ['#FF778E'], 'progressSelectedColor': ['#FF778E']}}, {'start': 5, 'end': 7, 'name': 'job_0 task_1', 'id': 'job_0|task_1', 'job_name': 'job_0', 'progress': 100, 'type': 'task', 'project': 'Machine 1', 'styles': {'progressColor': ['#FF7AA5'], 'progressSelectedColor': ['#FF7AA5']}}, {'start': 7, 'end': 11, 'name': 'job_1 task_2', 'id': 'job_1|task_2', 'job_name': 'job_1', 'progress': 100, 'type': 'task', 'project': 'Machine 1', 'styles': {'progressColor': ['#FF4495'], 'progressSelectedColor': ['#FF4495']}}, {'start': 2, 'end': 9, 'name': 'Machine 2', 'id': 'Machine 2', 'progress': 100, 'type': 'project', 'hideChildren': false}, {'start': 2, 'end': 3, 'name': 'job_1 task_1', 'id': 'job_1|task_1', 'job_name': 'job_1', 'progress': 100, 'type': 'task', 'project': 'Machine 2', 'styles': {'progressColor': ['#FF4495'], 'progressSelectedColor': ['#FF4495']}}, {'start': 4, 'end': 7, 'name': 'job_2 task_1', 'id': 'job_2|task_1', 'job_name': 'job_2', 'progress': 100, 'type': 'task', 'project': 'Machine 2', 'styles': {'progressColor': ['#FF778E'], 'progressSelectedColor': ['#FF778E']}}, {'start': 7, 'end': 9, 'name': 'job_0 task_2', 'id': 'job_0|task_2', 'job_name': 'job_0', 'progress': 100, 'type': 'task', 'project': 'Machine 2', 'styles': {'progressColor': ['#FF7AA5'], 'progressSelectedColor': ['#FF7AA5']}}]
  const tasks = setTrueDate(origin_tasks)
  return tasks;
}


export function getStartEndDateForProject(tasks, projectId) {
const projectTasks = tasks.filter(t => t.project === projectId);
let start = projectTasks[0].start;
let end = projectTasks[0].end;

for (let i = 0; i < projectTasks.length; i++) {
  const task = projectTasks[i];
  if (start.getTime() > task.start.getTime()) {
    start = task.start;
  }
  if (end.getTime() < task.end.getTime()) {
    end = task.end;
  }
}
return [start, end];
}