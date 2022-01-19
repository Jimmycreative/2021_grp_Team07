export function initTasks() {
    const currentDate = new Date();
    const origin_tasks=[{'start':0,'name':'Maachine 0','progress':0,'end':5,'id':'Machine 0','type':'project','hideChildren':false},{'start':0,'name':'job_0 task_0','progress':0,'project':'Machine 0','end':3,'id':'job_0|task_0','type':'task'},{'start':3,'name':'job_1 task_0','progress':0,'project':'Machine 0','end':5,'id':'job_1|task_0','type':'task'},{'start':0,'name':'Maachine 1','progress':0,'end':10,'id':'Machine 1','type':'project','hideChildren':false},{'start':0,'name':'job_2 task_0','progress':0,'project':'Machine 1','end':4,'id':'job_2|task_0','type':'task'},{'start':4,'name':'job_0 task_1','progress':0,'project':'Machine 1','end':6,'id':'job_0|task_1','type':'task','dependencies':['job_0|task_0']},{'start':6,'name':'job_1 task_2','progress':0,'project':'Machine 1','end':10,'id':'job_1|task_2','type':'task','dependencies':['job_1|task_1']},{'start':4,'name':'Maachine 2','progress':0,'end':9,'id':'Machine 2','type':'project','hideChildren':false},{'start':4,'name':'job_2 task_1','progress':0,'project':'Machine 2','end':7,'id':'job_2|task_1','type':'task','dependencies':['job_2|task_0']},{'start':7,'name':'job_0 task_2','progress':0,'project':'Machine 2','end':9,'id':'job_0|task_2','type':'task','dependencies':['job_0|task_1']},{'start':5,'name':'Maachine 12','progress':0,'end':6,'id':'Machine 12','type':'project','hideChildren':false},{'start':5,'name':'job_1 task_1','progress':0,'project':'Machine 12','end':6,'id':'job_1|task_1','type':'task','dependencies':['job_1|task_0']}]
    const tasks = setTrueDate(origin_tasks)
  return tasks;
  }
  
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
  
  