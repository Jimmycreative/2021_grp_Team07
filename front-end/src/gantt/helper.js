function setTrueDate(origin_tasks) {
  const currentDate = new Date();
  var real_tasks=[]
  for (let i = 0; i < origin_tasks.length; i++) {
    const task = origin_tasks[i];
    var start=task.start+1
    var end=task.end+1
    var type=task.type
    task.start=new Date(currentDate.getFullYear(), currentDate.getMonth(), start)
    task.end=new Date(currentDate.getFullYear(), currentDate.getMonth(), end)
    if (type=='project') {
      task.styles={progressColor: '#FFCCCC',progressSelectedColor: '#FFCCCC'}
    }
    real_tasks.push(task)
  }
  return real_tasks
}

export function initTasks(my_tasks) {
  console.log("line 20",my_tasks)
  const test_tasks=[{'start':0,'name':'machine_0','progress':100,'end':5,'id':'Machine 0','type':'project','hideChildren':false},{'job_name':'job_0','start':0,'name':'job_1 task_0','progress':100,'project':'Machine 0','end':3,'styles':{'progressColor':'#FF367C','progressSelectedColor':'#FF367C'},'id':'job_0|task_0','type':'task'},{'job_name':'job_1','start':3,'name':'job_2 task_0','progress':100,'project':'Machine 0','end':5,'styles':{'progressColor':'#FFBC7A','progressSelectedColor':'#FFBC7A'},'id':'job_1|task_0','type':'task'},{'start':0,'name':'machine_1','progress':100,'end':10,'id':'Machine 1','type':'project','hideChildren':false},{'job_name':'job_2','start':0,'name':'job_3 task_0','progress':100,'project':'Machine 1','end':4,'styles':{'progressColor':'#FF87CC','progressSelectedColor':'#FF87CC'},'id':'job_2|task_0','type':'task'},{'job_name':'job_0','start':4,'name':'job_1 task_1','progress':100,'project':'Machine 1','end':6,'styles':{'progressColor':'#FF367C','progressSelectedColor':'#FF367C'},'id':'job_0|task_1','type':'task'},{'job_name':'job_1','start':6,'name':'job_2 task_2','progress':100,'project':'Machine 1','end':10,'styles':{'progressColor':'#FFBC7A','progressSelectedColor':'#FFBC7A'},'id':'job_1|task_2','type':'task'},{'start':4,'name':'machine_2','progress':100,'end':9,'id':'Machine 2','type':'project','hideChildren':false},{'job_name':'job_2','start':4,'name':'job_3 task_1','progress':100,'project':'Machine 2','end':7,'styles':{'progressColor':'#FF87CC','progressSelectedColor':'#FF87CC'},'id':'job_2|task_1','type':'task'},{'job_name':'job_0','start':7,'name':'job_1 task_2','progress':100,'project':'Machine 2','end':9,'styles':{'progressColor':'#FF367C','progressSelectedColor':'#FF367C'},'id':'job_0|task_2','type':'task'},{'start':5,'name':'machine_12','progress':100,'end':6,'id':'Machine 12','type':'project','hideChildren':false},{'job_name':'job_1','start':5,'name':'job_2 task_1','progress':100,'project':'Machine 12','end':6,'styles':{'progressColor':'#FFBC7A','progressSelectedColor':'#FFBC7A'},'id':'job_1|task_1','type':'task'}]
  const origin_tasks=[{'start': 0, 'end': 5, 'name': 'Machine 0', 'id': 'Machine 0', 'progress': 100, 'type': 'project', 'hideChildren': false}, {'start': 0, 'end': 2, 'name': 'job_1 task_0', 'id': 'job_1|task_0', 'job_name': 'job_1', 'progress': 100, 'type': 'task', 'project': 'Machine 0', 'styles': {'progressColor': '#FFA87A', 'progressSelectedColor': '#FFA87A'}}, {'start': 2, 'end': 5, 'name': 'job_0 task_0', 'id': 'job_0|task_0', 'job_name': 'job_0', 'progress': 100, 'type': 'task', 'project': 'Machine 0', 'styles': {'progressColor': '#FF4829', 'progressSelectedColor': '#FF4829'}}, {'start': 0, 'end': 11, 'name': 'Machine 1', 'id': 'Machine 1', 'progress': 100, 'type': 'project', 'hideChildren': false}, {'start': 0, 'end': 4, 'name': 'job_2 task_0', 'id': 'job_2|task_0', 'job_name': 'job_2', 'progress': 100, 'type': 'task', 'project': 'Machine 1', 'styles': {'progressColor': '#FF36C3', 'progressSelectedColor': '#FF36C3'}}, {'start': 5, 'end': 7, 'name': 'job_0 task_1', 'id': 'job_0|task_1', 'job_name': 'job_0', 'progress': 100, 'type': 'task', 'project': 'Machine 1', 'styles': {'progressColor': 
  '#FF4829', 'progressSelectedColor': '#FF4829'}}, {'start': 7, 'end': 11, 'name': 'job_1 task_2', 'id': 'job_1|task_2', 'job_name': 'job_1', 'progress': 100, 'type': 'task', 'project': 'Machine 1', 'styles': {'progressColor': '#FFA87A', 'progressSelectedColor': '#FFA87A'}}, {'start': 2, 'end': 9, 'name': 'Machine 2', 'id': 'Machine 2', 'progress': 100, 'type': 'project', 'hideChildren': false}, {'start': 2, 'end': 3, 'name': 'job_1 task_1', 'id': 'job_1|task_1', 'job_name': 'job_1', 'progress': 100, 'type': 'task', 'project': 'Machine 2', 'styles': {'progressColor': '#FFA87A', 'progressSelectedColor': '#FFA87A'}}, {'start': 4, 'end': 7, 
  'name': 'job_2 task_1', 'id': 'job_2|task_1', 'job_name': 'job_2', 'progress': 100, 'type': 'task', 'project': 'Machine 2', 'styles': {'progressColor': '#FF36C3', 'progressSelectedColor': '#FF36C3'}}, {'start': 7, 'end': 9, 'name': 'job_0 task_2', 'id': 'job_0|task_2', 'job_name': 'job_0', 'progress': 100, 'type': 'task', 'project': 'Machine 2', 'styles': {'progressColor': '#FF4829', 'progressSelectedColor': '#FF4829'}}]
  const tasks = setTrueDate(my_tasks)
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