'''
Basic Type JSSP
'''
import collections
from ortools.sat.python import cp_model
from pymodel import util
import time

try:
    print("Started\t",time.asctime( time.localtime(time.time())))
    jobs_data = [  # task = (machine_id, processing_time).
        #define the jobs
    ]
    
    model_type = "basic"
    all_machines = util.getMachineListCount(jobs_data)
    
    # Computes horizon dynamically as the sum of all durations.
    horizon =util.getHorizon(jobs_data)
    
    model = cp_model.CpModel()
    print("Model created\t",time.asctime( time.localtime(time.time())))
    
    # Named tuple to store information about created variables.
    task_type = collections.namedtuple('task_type', 'start end interval')
    # Named tuple to manipulate solution information.
    assigned_task_type = collections.namedtuple('assigned_task_type',
                                                    'start job index duration')
                                                    
    # Creates job intervals and add to the corresponding machine lists.
    all_tasks = {}
    machine_to_intervals = collections.defaultdict(list)
    
    util.appendToModel(jobs_data, all_tasks, model, horizon, task_type, machine_to_intervals)
    
    #basic model constraints
    util.addBasicConstraints(all_machines, model, machine_to_intervals, jobs_data, all_tasks)
    print("Constraints added\t",time.asctime( time.localtime(time.time())))
    
    # Makespan objective.
    util.minimizeMakespan(model, horizon, all_tasks, jobs_data)
    print("Objective function defined\t",time.asctime( time.localtime(time.time())))
    
    solver = cp_model.CpSolver()
    print("Solving...\t",time.asctime( time.localtime(time.time())))
    status = solver.Solve(model)
    print("Solved\t",time.asctime( time.localtime(time.time())))

    # Statistics.
    print('Statistics')
    print('  - conflicts: %i' % solver.NumConflicts())
    print('  - branches : %i' % solver.NumBranches())
    print('  - wall time: %f s' % solver.WallTime())
    
    
    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        # Create one list of assigned tasks per machine.
        assigned_jobs = collections.defaultdict(list)
        util.getSolution(jobs_data, assigned_jobs, assigned_task_type, solver, all_tasks, model_type, [], -1)
        
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
