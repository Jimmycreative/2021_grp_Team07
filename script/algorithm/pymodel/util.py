from operator import itemgetter
import random
import uuid

flexible_type='flexible'
dynamic_type='dynamic'
multi_resource_type='multiresource'

def getDictKeys(d, value):
    return [k for k,v in d.items() if v == value]



def sortDict(expected_duration, dict):
    for i in range(len(expected_duration)):
        dict[i]=expected_duration[i]
    return dict


def getMachineListCount(jobs_data):
    temp={}
    for job in jobs_data:
        for task in job:
            if isinstance(task, list):
                for item in task:
                    getCount(temp, item)
            else:
                getCount(temp, task)
    return temp

# use to count each item in dict
def getCount(my_dict, my_tuple):
    if my_tuple[0] in my_dict.keys():
        my_dict[my_tuple[0]]=my_dict[my_tuple[0]]+1
    else:
        my_dict[my_tuple[0]]=1
        

def getHorizon(jobs_data):
    sum=0
    for job in jobs_data:
        for task in job:
            if isinstance(task, list):
                sum+=max(task,key=itemgetter(1))[1]
            else:
                sum+=task[1]
    return sum




def appendToModel(jobs_data, all_tasks, model, horizon, task_type, machine_to_intervals):
    for job_id, job in enumerate(jobs_data):
        for task_id, task in enumerate(job):
            machine = task[0]
            setModelParam(task, job_id, task_id, model, horizon, all_tasks, task_type, machine_to_intervals, machine)
                

    return all_tasks, machine_to_intervals



def setModelParam(task, job_id, task_id, model, horizon, all_tasks, task_type, machine_to_intervals, machine):
    duration = task[1]
    suffix = '_%i_%i' % (job_id, task_id)
    start_var = model.NewIntVar(0, horizon, 'start' + suffix)
    end_var = model.NewIntVar(0, horizon, 'end' + suffix)
    interval_var = model.NewIntervalVar(start_var, duration, end_var,
                                        'interval' + suffix)
    all_tasks[job_id, task_id] = task_type(start=start_var,
                                            end=end_var,
                                            interval=interval_var)
    machine_to_intervals[machine].append(interval_var)



def addBasicConstraints(all_machines, model, machine_to_intervals, jobs_data, all_tasks):
    # Create and add disjunctive constraints.
    for machine in all_machines.keys():
        model.AddNoOverlap(machine_to_intervals[machine])
        
        # Precedences inside a job.
        for job_id, job in enumerate(jobs_data):
            for task_id in range(len(job) - 1):
                model.Add(all_tasks[job_id, task_id +
                                    1].start >= all_tasks[job_id, task_id].end)



def addPriorityConstraint(expected_duration, dict, jobs_data, model, all_tasks):
    for index in range(len(expected_duration)-2):
        order=getDictKeys(dict, expected_duration[index])
        if len(order)==0:
            continue
        dict[order[0]]=-1

        next_order=getDictKeys(dict, expected_duration[index+1])
        if len(next_order)==0:
            continue
        dict[next_order[0]]=-1
        
        # priority constraint
        cur_len=len(jobs_data[order[0]])-1
        next_len=len(jobs_data[next_order[0]])-1
        model.Add(all_tasks[order[0], cur_len].end <= all_tasks[next_order[0], next_len].end)



def minimizeMakespan(model, horizon, all_tasks, jobs_data):
    obj_var = model.NewIntVar(0, horizon, 'makespan')
    model.AddMaxEquality(obj_var, [
        all_tasks[job_id, len(job) - 1].end
        for job_id, job in enumerate(jobs_data)
        ])
    model.Minimize(obj_var)



def getSolution(jobs_data, assigned_jobs, assigned_task_type, solver, all_tasks, model_type, id_list, index):
    for job_id, job in enumerate(jobs_data):
        for task_id, task in enumerate(job):
            machine = task[0]
            if model_type==multi_resource_type:
                real_id=task[2]
                assigned_jobs[machine].append(
                    assigned_task_type(start=solver.Value(
                        all_tasks[job_id, task_id].start),
                                        job=job_id,
                                        index=real_id,
                                        duration=task[1]))
            else:
                if model_type==flexible_type:
                    machine = id_list[index]
                assigned_jobs[machine].append(
                    assigned_task_type(start=solver.Value(
                        all_tasks[job_id, task_id].start),
                                        job=job_id,
                                        index=task_id,
                                        duration=task[1]))
                if model_type==flexible_type:
                    index+=1

def randomcolor():
    colorArr = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    color = "FF"
    for i in range(4):
        color += colorArr[random.randint(0,14)]
    return "#"+color

def generateOutput(all_machines, assigned_jobs, time_length):
    uid = str(uuid.uuid1())
    suid = ''.join(uid.split('-'))
    output=[]
    job_count={}
    for machine in all_machines.keys():
        cur_machine={}
        # Sort by starting time.
        assigned_jobs[machine].sort()
        machine_name = 'Machine ' + str(machine)
        
        machine_start=assigned_jobs[machine][0].start
        machine_last_start=assigned_jobs[machine][len(assigned_jobs[machine])-1].start
        machine_last_duration=assigned_jobs[machine][len(assigned_jobs[machine])-1].duration
        cur_machine['start']=machine_start
        cur_machine['end']=machine_last_start+machine_last_duration

        cur_machine['name']=machine_name
        cur_machine['id']=suid+"|"+machine_name
        cur_machine['progress']=100
        cur_machine['type']="project"
        cur_machine['hideChildren']=False
        output.append(cur_machine)
        
        for assigned_task in assigned_jobs[machine]:
            cur_job={}
            duration = assigned_task.duration
            if duration!=0:
                start = assigned_task.start
                cur_job['start']=start
                cur_job['end']=start + duration
                
                job_name='job_%i' % (assigned_task.job)
                task_name='task_%i' % (assigned_task.index)
                cur_job['name']=job_name+" "+task_name
                cur_job['id']=suid+"|"+job_name+"|"+task_name
                cur_job['job_name']=job_name
                # to calculate the job count
                if (job_name in job_count.keys()):
                    job_count[job_name]=job_count[job_name]+1
                else:
                    job_count[job_name]=1
                
                cur_job['progress']=100
                cur_job['type']="task"
                cur_job['project']=machine_name
                
                    
                output.append(cur_job)
        
    setColor(len(job_count),output)   
    realoutput={}
    realoutput['time_length']=time_length
    realoutput['result']=output
    return realoutput

def setColor(job_count, my_list):
    colors=[]
    for i in range(job_count):
        color={}
        job_name=job_name='job_%i' % i
        color['job_name']=job_name
        color['color']=randomcolor()
        colors.append(color)
    # set color
    for item in my_list:
        if (item['type']=='task'):
            my_name=item['job_name']
            my_color = [item['color'] for item in colors if item['job_name'] ==my_name]
            real_color=my_color[0]
            item['styles']={ 'progressColor': real_color, 'progressSelectedColor':real_color}
