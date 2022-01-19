export function initTasks() {
    const currentDate = new Date();
    const tasks = [
      {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6),
      name: "Machine 0",
      id: "Machine 0",
      progress: 45,
      type: "project",
  
      hideChildren: false,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        4
      ),
      name: "job_0 task_0",
      id: "job_0_task_0",
      progress: 100,
      type: "task",
      project: "Machine 0",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6, 0, 0),
      name: "job_1 task_0",
      id: "job_1_task_0",
      progress: 25,
      //dependencies: ["Task 0"],
      type: "task",
      project: "Machine 0",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Machine 1",
      id: "Machine 1",
      progress: 0,
      //isDisabled: true,
      type: "project",
      hideChildren: false,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "job_2_task_0",
      id: "job_2_task_0",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "Machine 1",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6, 0, 0),
      name: "job_0 task_1",
      id: "job_0_task_1",
      progress: 20,
      dependencies: ["job_0_task_0"],
      type: "task",
      project: "Machine 1",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10, 0, 0),
      name: "job_1 task_2",
      id: "job_1_task_2",
      progress: 20,
      dependencies: ["job_1_task_1"],
      type: "task",
      project: "Machine 1",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "job_1 finished",
      id: "job_1_milestone",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["job_1_task_2"],
      project: "Machine 1",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Machine 2",
      id: "Machine 2",
      progress: 0,
      //isDisabled: true,
      type: "project",
      hideChildren: false,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7, 0, 0),
      name: "job_2 task_1",
      id: "job_2_task_1",
      progress: 20,
      dependencies: ["job_2_task_0"],
      type: "task",
      project: "Machine 2",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "job_0 task_2",
      id: "job_0_task_2",
      progress: 20,
      dependencies: ["job_0_task_1"],
      type: "task",
      project: "Machine 2",
    },
  ];
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
  
  