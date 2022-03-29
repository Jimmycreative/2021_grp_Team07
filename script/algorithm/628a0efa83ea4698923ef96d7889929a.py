'''
Multi Resource Type JSSP
'''
import collections
from operator import itemgetter
from ortools.sat.python import cp_model
from pymodel import util
import time


try:
    print("Started\t",time.asctime(time.localtime(time.time())))
    jobs_data = [  # task = (machine_id, processing_time).
[(3, 2)], [(6, 1), (4, 7)], [(4, 2), (6, 8)], [(1, 2), (4, 5), (3, 3), (1, 1), (2, 4)]    ]
    

    model_type = "multiresource"
    all_machines = util.getMachineListCount(jobs_data)

    # Computes horizon dynamically as the sum of all durations.
    horizon =util.getHorizon(jobs_data)

    # Create the model.
    model = cp_model.CpModel()
    print("Model created\t",time.asctime(time.localtime(time.time())))

    # Named tuple to store information about created variables.
    task_type = collections.namedtuple('task_type', 'start end interval')
    # Named tuple to manipulate solution information.
    assigned_task_type = collections.namedtuple('assigned_task_type',
                                                'start job index duration')

    # Creates job intervals and add to the corresponding machine lists.
    all_tasks = {}
    machine_to_intervals = collections.defaultdict(list)

    for job_id, job in enumerate(jobs_data):
        for task_id, task in enumerate(job):
            
            i=0
            machine_list=list(map(itemgetter(0), task))
            duration_list=list(map(itemgetter(1), task))
            for machine_duration in task:
                resource_id=i
                i+=1
                suffix = '_%i_%i_%i' % (job_id, task_id, resource_id)

                machine=machine_duration[0]
                duration=machine_duration[1]
                start_var = model.NewIntVar(0, horizon, 'start' + suffix)
                end_var = model.NewIntVar(0, horizon, 'end' + suffix)
                interval_var = model.NewIntervalVar(start_var, duration, end_var,
                                                        'interval' + suffix)
                all_tasks[job_id, task_id, resource_id] = task_type(start=start_var,
                                                                        end=end_var,
                                                                        interval=interval_var)
                machine_to_intervals[machine].append(interval_var)


    # Create and add disjunctive constraints.
    for machine in all_machines.keys():
        model.AddNoOverlap(machine_to_intervals[machine])

    minimize_arr=[]
    # Precedences inside a job.
    for job_id, job in enumerate(jobs_data):
        for task_id, task in enumerate(job):
            for resource_id, resource in enumerate(task):
                if task_id<len(job)-1:
                    for next_resource_id, next_resource in enumerate(job[task_id+1]):
                        model.Add(all_tasks[job_id, task_id +
                                                     1, next_resource_id].start >= all_tasks[job_id, task_id, resource_id].end)
                if task_id==len(job)-1:
                    resource_id=task.index(max(task,key=itemgetter(1)))
                    minimize_arr.append(all_tasks[job_id, task_id, resource_id].end)
                    
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
                for resource_id, resource in enumerate(task):
                    machine = resource[0]
                    assigned_jobs[machine].append(
                        assigned_task_type(start=solver.Value(
                            all_tasks[job_id, task_id, resource_id].start),
                                       job=job_id,
                                       index=task_id,
                                       duration=resource[1]))

        # Create per machine output lines.
        output = util.generateOutput(all_machines, assigned_jobs, solver.ObjectiveValue())
        
        print("-----")
        print(output)
    else:
        print("-----")
        print('No solution found.')

except Exception as ex:
    print("Algorithm exception: %s"%ex)
