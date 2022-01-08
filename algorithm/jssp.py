import collections
from ortools.sat.python import cp_model

def dic_to_list(dictionary):

    machine_list = []
    for i in dictionary:
        temp = dictionary[i]
        while(dictionary[i]!=0):

            machine_list.append(str(i)+str(dictionary[i]))
            dictionary[i]-=1
        dictionary[i]+=temp
    print(machine_list)
    return machine_list

def count_each_machine():
    count_machine = {}
    for job in jobs_data:
        for task in job:
            if task[0] in count_machine: #check key already exist in dictionary
                count_machine[task[0]]+=1
            else:
                count_machine[task[0]] = 1
    return count_machine

def distribute_machine(count_machine):
    print(count_machine)
    print(user_input)
    id_list = [] #machine id list
    for i in count_machine:
        remainder = count_machine[i]%user_input[i]

        for job_id, job in enumerate(jobs_data):
            for task_id, task in enumerate(job):
                if i==task[0]:
                    #machine = task[0]
                    if remainder==0:
                        remainder+=user_input[i]
                    
                    machine_id = str(i)+str(remainder)
                    print(machine_id)
                    duration = task[1]
                    suffix = '_%i_%i' % (job_id, task_id)
                    start_var = model.NewIntVar(0, horizon, 'start' + suffix)
                    end_var = model.NewIntVar(0, horizon, 'end' + suffix)
                    interval_var = model.NewIntervalVar(start_var, duration, end_var,
                                                        'interval' + suffix)
                    all_tasks[job_id, task_id] = task_type(start=start_var,
                                                        end=end_var,
                                                        interval=interval_var)
                    machine_to_intervals[machine_id].append(interval_var)

                    remainder-=1
                    if job_id==0:
                        id_list.insert(task_id,machine_id)
                    else:
                        count = 0
                        index = 0
                        while(count!=job_id):
                            index+=len(jobs_data[count])
                            count+=1
                        index+=task_id
                        id_list.insert(index,machine_id)
                    
                    
    return id_list
    

job_type = "flexible"
jobs_data = [  # task = (machine_id, processing_time, task_id, priority).
    [(0, 3, 0, -1), (1, 2, 1, -1), (2, 2, 2, -1)],  # Job0
    [(0, 2, 0, -1), (2, 1, 1, -1), (1, 4, 2, -1)],  # Job1
    [(1, 4, 0, -1), (2, 3, 1, -1)]  # Job2
]
count_machine = count_each_machine()
machines_count = 1 + max(task[0] for job in jobs_data for task in job)

user_input = {0:2,1:2,2:2}
print("user: ", list(user_input.keys())[0])
all_machines = dic_to_list(user_input)
#dic_to_list(user_input)
#all_machines = range(machines_count)

# Computes horizon dynamically as the sum of all durations.
horizon = sum(task[1] for job in jobs_data for task in job)

# Named tuple to store information about created variables.
task_type = collections.namedtuple('task_type', 'start end interval')
# Named tuple to manipulate solution information.
assigned_task_type = collections.namedtuple('assigned_task_type',
                                            'start job index duration')

model = cp_model.CpModel()
# Creates job intervals and add to the corresponding machine lists.
all_tasks = {}
machine_to_intervals = collections.defaultdict(list)


id_list = distribute_machine(count_machine)
print("id list: ", id_list)
#print(horizon)

print("in")
print(machine_to_intervals)

# Create and add disjunctive constraints.
for machine in all_machines:
    model.AddNoOverlap(machine_to_intervals[machine])

# Precedences inside a job.
for job_id, job in enumerate(jobs_data):
    for task_id in range(len(job) - 1):
        model.Add(all_tasks[job_id, task_id +
                1].start >= all_tasks[job_id, task_id].end)

solver = cp_model.CpSolver()
status = solver.Solve(model)

if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
    print('Solution:')
    
    # Create one list of assigned tasks per machine.
    assigned_jobs = collections.defaultdict(list)
    index = 0 #index for machine_to_intervals
    print(all_tasks)
    for job_id, job in enumerate(jobs_data):
        for task_id, task in enumerate(job):
            machine = id_list[index]
            assigned_jobs[machine].append(
                assigned_task_type(start=solver.Value(
                    all_tasks[job_id, task_id].start),
                                   job=job_id,
                                   index=task_id,
                                   duration=task[1]))
            index+=1
    print(assigned_jobs)
    # Create per machine output lines.
    output = ''
    for machine in all_machines:
        # Sort by starting time.
        assigned_jobs[machine].sort()
        if job_type == "flexible":
            sol_line_tasks = 'Machine ' + str(machine[0]) + ': '
        else:
            sol_line_tasks = 'Machine ' + str(machine) + ': '

        sol_line = '           '

        for assigned_task in assigned_jobs[machine]:
            name = 'job_%i_task_%i' % (assigned_task.job,
                                       assigned_task.index)
            # Add spaces to output to align columns.
            sol_line_tasks += '%-15s' % name

            start = assigned_task.start
            duration = assigned_task.duration
            sol_tmp = '[%i,%i]' % (start, start + duration)
            # Add spaces to output to align columns.
            sol_line += '%-15s' % sol_tmp

        sol_line += '\n'
        sol_line_tasks += '\n'
        output += sol_line_tasks
        output += sol_line

    # Finally print the solution found.
    print(f'Optimal Schedule Length: {solver.ObjectiveValue()}')
    print(output)
else:
    print('No solution found.')


