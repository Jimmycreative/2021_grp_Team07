'''
Flexible Type JSSP
'''
import collections
from operator import itemgetter
from ortools.sat.python import cp_model
from pymodel import util
import time

    

try:
    print("Started\t",time.asctime(time.localtime(time.time())))
    jobs_data = [  # task = (machine_id, processing_time).
[(0, 3), [(2, 4), (4, 2)], (2, 4)], [(4, 1), [(2, 1), (3, 12)]], [(0, 4), (2, 3)]    ]

    

    model_type = "multimachine"
    all_machines = util.getMachineListCount(jobs_data)

    # Computes horizon dynamically as the sum of all durations.
    horizon = util.getHorizon(jobs_data)

    # Create the model.
    model = cp_model.CpModel()
    print("Model created\t",time.asctime(time.localtime(time.time())))

    # Named tuple to store information about created variables.
    # selected stands for selected machine
    task_type = collections.namedtuple('task_type', 'start end duration interval selected machine')
    # Named tuple to manipulate solution information.
    assigned_task_type = collections.namedtuple('assigned_task_type',
                                                'start job index duration option')

    # Creates job intervals and add to the corresponding machine lists.
    all_tasks = {}
    machine_to_intervals = collections.defaultdict(list)

    for job_id, job in enumerate(jobs_data):
        for task_id, task in enumerate(job):
            if isinstance(task, list):
                i=0
                machine_list=list(map(itemgetter(0), task))
                
                suffix_0 = '_%i_%i' % (job_id, task_id)
                selected_var=model.NewIntVarFromDomain(cp_model.Domain.FromValues(machine_list), 'selected'+suffix_0)
                for machine_duration in task:
                    option=i
                    suffix = '_%i_%i_%i' % (job_id, task_id, option)
                    start_var = model.NewIntVar(0, horizon, 'start' + suffix)
                    end_var = model.NewIntVar(0, horizon, 'end' + suffix)
                    i+=1
                    machine=machine_duration[0]
                    duration=machine_duration[1]
                    duration_var=model.NewIntVarFromDomain(cp_model.Domain.FromValues([0, duration]), 'duration'+suffix)
                    machine_var=model.NewConstant(machine)
                    interval_var = model.NewIntervalVar(start_var, duration_var, end_var,
                                                'interval' + suffix)
                    
                    all_tasks[job_id, task_id, option] = task_type(start=start_var,
                                                   end=end_var,
                                                   duration=duration_var,
                                                   interval=interval_var,
                                                   selected=selected_var,
                                                   machine=machine_var)
                    machine_to_intervals[machine].append(interval_var)
                    is_selected=model.NewBoolVar('selecting'+suffix)
                    
                    model.Add(all_tasks[job_id, task_id, option].machine==all_tasks[job_id, task_id, option].selected).OnlyEnforceIf(is_selected)
                    model.Add(all_tasks[job_id, task_id, option].machine!=all_tasks[job_id, task_id, option].selected).OnlyEnforceIf(is_selected.Not())
                    my_zero=model.NewConstant(0)
                    model.Add(all_tasks[job_id, task_id, option].duration==0).OnlyEnforceIf(is_selected.Not())
                    model.Add(all_tasks[job_id, task_id, option].duration==duration).OnlyEnforceIf(is_selected)

            else:
                option=0
                suffix = '_%i_%i_%i' % (job_id, task_id, option)
                start_var = model.NewIntVar(0, horizon, 'start' + suffix)
                end_var = model.NewIntVar(0, horizon, 'end' + suffix)
                machine = task[0]
                duration = model.NewConstant(task[1])
                selected_var=model.NewConstant(machine)
                interval_var = model.NewIntervalVar(start_var, duration, end_var,
                                                'interval' + suffix)
                all_tasks[job_id, task_id, option] = task_type(start=start_var,
                                                   end=end_var,
                                                   duration=duration,
                                                   interval=interval_var,
                                                   selected=selected_var,
                                                   machine=selected_var)
                machine_to_intervals[machine].append(interval_var)

    # Create and add disjunctive constraints.
    for machine in all_machines.keys():
        model.AddNoOverlap(machine_to_intervals[machine])

    # Precedences inside a job.
    all_jobs=[]
    minimize_arr=[]
    for item in all_tasks:
        all_jobs.append(item)
    for item_id, list_item in enumerate(all_jobs):
        job_id=list_item[0]
        task_id=list_item[1]
        option=list_item[2]
        if item_id<len(all_jobs)-1:
            next_item=all_jobs[item_id+1]
            next_job_id=next_item[0]
            next_task_id=next_item[1]
            next_option=next_item[2]
            if job_id==next_job_id:
                model.Add(all_tasks[job_id, task_id, option].end <= all_tasks[next_job_id, next_task_id, next_option].start)
        
        # for objective function
        for real_job_id, job in enumerate(jobs_data):
            task=job[len(job) - 1]
            if job_id==real_job_id and task_id==(len(job) - 1):
                minimize_arr.append(all_tasks[job_id, task_id, option].end)

    
    print("Constraints added\t",time.asctime(time.localtime(time.time())))

    # Makespan objective.
    obj_var = model.NewIntVar(0, horizon, 'makespan')
    model.AddMaxEquality(obj_var, minimize_arr)
    model.Minimize(obj_var)
    print("Objective function defined\t",time.asctime(time.localtime(time.time())))

    # Creates the solver and solve.
    solver = cp_model.CpSolver()
    print("Solving...\t",time.asctime(time.localtime(time.time())))
    status = solver.Solve(model)
    print("Solved\t",time.asctime(time.localtime(time.time())))

    # Statistics.
    print('Statistics')
    print('  - conflicts: %i' % solver.NumConflicts())
    print('  - branches : %i' % solver.NumBranches())
    print('  - wall time: %f s' % solver.WallTime())

    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        print('Solution:')
        # Create one list of assigned tasks per machine.
        assigned_jobs = collections.defaultdict(list)
        for job_id, job in enumerate(jobs_data):
            for task_id, task in enumerate(job):
                option=0
                if isinstance(task, list):
                    for cur_machine in task:
                        machine=cur_machine[0]
                        #print(solver.Value(all_tasks[job_id, task_id, option].selected))
                        print(solver.Value(all_tasks[job_id, task_id, option].duration))
                        assigned_jobs[machine].append(
                            assigned_task_type(start=solver.Value(
                                all_tasks[job_id, task_id, option].start),
                                                job=job_id,
                                                index=task_id,
                                                duration=solver.Value(
                                all_tasks[job_id, task_id, option].duration),
                                                option=option))
                        option+=1
                else:
                    machine = task[0]
                    assigned_jobs[machine].append(
                        assigned_task_type(start=solver.Value(
                            all_tasks[job_id, task_id, option].start),
                                       job=job_id,
                                       index=task_id,
                                       duration=task[1],
                                       option=option))

        # Create per machine output lines.
        output = util.generateOutput(all_machines, assigned_jobs, solver.ObjectiveValue())

        # Finally print the solution found.
        print("-----")
        print(output)
    else:
        print("-----")
        print('No solution found.')

    

except Exception as ex:
    print("Algorithm exception: %s"%ex)
