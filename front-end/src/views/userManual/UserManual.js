import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import './userManual.css'

const markdown=`
* [**1. Page Navigation**](#page-navigation)
    * [**Home Page**](#home)
    * [**Assignment Page**](#assignment)
        * [**Manager**](#manager-assignment)
        * [**Planner**](#planner-assignment)
    * [**Definition Page**](#definition)
    * [**Evaluation Page**](#evaluation)
* [**2. Definition Types**](#definition-types)
    * [**Basic Type**](#basic-type)
    * [**Dynamic Type**](#dynamic-type)
    * [**Flexible Type**](#flexible-type)
    * [**Multi-Resource Type**](#multi-resource-type)
* [**3. Script Language**](#script-language)
    * [**JSSP Related Grammer and Functions**](#job-table)
    * [**Other Keywords**](#keyword-table)
    * [**Operators**](#operator-table)
    * [**Variable Types**](#type-table)
`
const page_input = `
<div class="catelog" id="page-navigation">

// # Some *emphasis* and <strong>strong</strong>!
### Page Navigation
</div>

<div class="page-content">
<div id="home">

#### Home Page
</div>

<div id="assignment">

#### Assignment Page
</div>

<div id="manager-assignment">

1. Manager
    - New Schedule
    - Invitation
</div>

<div id="planner-assignment">

2. Planner
    - New Schedule
</div>

<div id="definition">

#### Definition Page
</div>

<div id="evaluation">

#### Evaluation Page
<div id="my-schedule">

- My Schedule\n
This page shows all shcedules, including finished and ongoing of one user.\n
</div>

<div id="progress">

- Progress\n
This page shows progress for all ongoing shcedules of one user.\n
</div>
</div>
</div>
`
const basic_type_input=`
<div class="catelog" id="definition-types">

### Definition Types for Job Shop Scheduling Problem (JSSP)
<div>

👉You can explore algorithms [here](https://developers.google.com/optimization/scheduling/job_shop) !
</div>

</div>
<div class="page-content">

<div id="basic-type">

#### Basic Type
<div class="type-explanation">

It is the foundmental type of JSSP. Every other types are based on this type.\n
All operations for one job are performed in a predetermined order.\n
Users should define:\n
- job data: including tasks for each job, machine id and duration for each task. Tasks within one job are constrained by their precedence. 
- job names (optional): the order and length should be same as the definition of job data. Use *job_names* as keyword.
- machine names (optional): the order and length should be same as the index of the machine defined in job data. Use *machine_names* as keyword.
- choose *model.runBasic()*\n
See code snippet below👇:
</div>

</div>

</div>
`
const basic_type_code = `
~~~java
//task=[machine_id, duration]
job1=[[0, 3], [1, 2], [2, 2]]
job2=[[0, 2], [12, 1], [1, 4]]
job3=[[1, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_1", "machine_2"]

//remember to return
return model.runBasic(jobs)
~~~
`

const dynamic_type_input=`
<div class="page-content">

<div id="dynamic-type">

#### Dynamic Type
<div class="type-explanation">
Dynamic Type allows you to set priorities for different jobs.\n
There are various ways to set priorities for different jobs. Here we simply use the expected duration to set priorities in ascending order.\n
That is to say, job with shortest expected duration will have highest priority and vice versa.\n
Users should define:\n
- job data: including tasks for each job, machine id and duration for each task. Tasks within one job are constrained by their precedence.
- expected duration: the order and length should be same as the definition of job data. 
- job names (optional): the order and length should be same as the definition of job data. Use *job_names* as keyword.
- machine names (optional): the order and length should be same as the index of the machine defined in job data. Use *machine_names* as keyword.
- choose *model.runDynamic()*\n
See code snippet below👇:
</div>
</div>

<div>
`
const dynamic_type_code=`
~~~java
//task=[machine_id, duration]
job1=[[0, 3], [1, 2], [2, 2]]
job2=[[0, 2], [12, 1], [1, 4]]
job3=[[1, 4], [2, 3]]
jobs=[job1,job2,job3]

//priorities will be set in ascending order of expected duration
expected_duration=[15,15,10]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_1", "machine_2", "machine_12"]

//remember to return
model.runDynamic(jobs,expected_duration)
~~~
`

const flexible_type_code=`
~~~java
//task=[machine_id, duration]
//if one task has multiple machine choices, it can be defined as below
job1=[[0, 3], [[2, 4], [4, 2]], [2, 4]]
job2=[[4, 1],[[2, 1],[3, 12]]]
job3=[[0, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_2", "machine_3", "machine_4"]

//remember to return
model.runFlexible(jobs)
~~~
`

const flexible_type_input=`
<div class="page-content">
<div id="flexible-type">

#### Flexible Type
<div class="type-explanation">

Flexible type allows you to choose one of identical machines for one task.\n
While different machines in same category might have different performances.\n
Users should define:\n
- job data: including tasks for each job, machine id and duration for each task. Tasks within one job are constrained by their precedence. 
- job names (optional): the order and length should be same as the definition of job data. Use *job_names* as keyword.
- machine names (optional): the order and length should be same as the index of the machine defined in job data. Use *machine_names* as keyword.
- choose *model.Flexible()*\n
See code snippet below👇:
</div>
</div>

</div>
`

const multi_resource_type_input=`
<div class="page-content">

<div id="multi-resource-type">

#### Multi-Resource Type
<div class="type-explanation">

Multi-Resource type allows one task to run concurrently if it has two or more concurrent procedures with different machines/resources.\n
The script definition for job data is same with Flexible Type, but please pay attention to the different meanings in different types.\n
Users should define:\n
- job data: including tasks for each job, machine id and duration for each task. Tasks within one job are constrained by their precedence. 
- job names (optional): the order and length should be same as the definition of job data. Use *job_names* as keyword.
- machine names (optional): the order and length should be same as the index of the machine defined in job data. Use *machine_names* as keyword.
- choose *model.runMulti()*\n
See code snippet below👇:
</div>
</div>

</div>
`
const multi_resource_type_code=`
~~~java
//task=[machine_id, duration]
//if one task has multiple concurrent processes on different machines, it can be defined as below
job1=[[0, 3], [[1, 2], [10,1]], [[2, 2],[12, 10]]]
job2=[[0, 2], [2, 1], [1, 4]]
job3=[[1, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_1", "machine_2", "machine_10", "machine_12"]

//remember to return
model.runMulti(jobs)
~~~
`

const script_grammar=`
<div class="catelog" id="script-language">

### Script Grammer

<div id="job-table">

#### JSSP Related Grammer and Functions
</div>

<table border=1px solid #51cbce; class="script-table" id="job-table-table">
    <thead>
        <tr>
            <th>Keyword</th>
            <th>Explanation</th>
            <th>Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>job_names</td>
            <td>To define job names</td>
            <td>job_names=["job_1","job_2", "job_3"]</td>
        </tr>
        <tr>
            <td>machine_names</td>
            <td>To define machine names</td>
            <td>machine_names=["machine_0","machine_1", "machine_2"]</td>
        </tr> 
        <tr>
            <td>minimize</td>
            <td>To define objective function</td>
            <td>minimize={{{}}} TODO</td>
        </tr>
        <tr>
            <td>model.runBasic()</td>
            <td>To use the basic type JSSP template</td>
            <td>return model.runBasic(jobs)</td>
        </tr>
        <tr>
            <td>model.runDynamic</td>
            <td>To use the dynamic type JSSP template</td>
            <td>model.runDynamic(jobs,expected_duration)</td>
        </tr>
        <tr>
            <td>model.runFlexible()</td>
            <td>To use the flexible type JSSP template</td>
            <td>model.runFlexible(jobs)</td>
        </tr>
        <tr>
            <td>model.runMulti()</td>
            <td>To use the multi-resource type JSSP template</td>
            <td>model.runMulti(jobs)</td>
        </tr>
    </tbody>


</table>

<div id="keyword-table">

#### Other Keywords
</div>

<table border=1px solid #51cbce; class="script-table">
    <thead>
        <tr>
            <th>Keyword</th>
            <th>Explanation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>var</td>
            <td>Define Variables</td>
        </tr>
        <tr>
            <td>if</td>
            <td>Used in conditional statements to indicate the branch when the condition does not hold</td>
        </tr>
        <tr>
            <td>for</td>
            <td>Loop statements</td>
        </tr>
        <tr>
            <td>in</td>
            <td>Used in conjunction with <i>for</i></td>
        </tr>
        <tr>
            <td>continue</td>
            <td>Execute next loop</td>
        </tr>
        <tr>
            <td>break</td>
            <td>Jump out of the loop</td>
        </tr>
        <tr>
            <td>return</td>
            <td>Terminates the execution of the current procedure and exits normally to the previous execution</td>
        </tr>
        <tr>
            <td>exit</td>
            <td>Terminate the current script and exit, such as: <code>exit 200,'execute successfully',[1,2,3];</code></td>
        </tr>
        <tr>
            <td>try</td>
            <td>Used to catch blocks of code where exceptions may occur</td>
        </tr>
        <tr>
            <td>catch</td>
            <td>Used in conjunction with <i>try</i> to execute when an exception occurs</td>
        </tr>
        <tr>
            <td>finally</td>
            <td>Used in conjunction with <i>try</i>, The <i>finally</i> block will be executed regardless of exceptions</td>
        </tr>
        <tr>
            <td>import</td>
            <td>Import a Java class or import a defined module</td>
        </tr>
        <tr>
            <td>as</td>
            <td>Used in conjunction with <i>import</i> to name the imported Java class or module as a local variable name</td>
        </tr>
        <tr>
            <td>new</td>
            <td>Create a new object</td>
        </tr>
        <tr>
            <td>true</td>
            <td>One of the primitive types, representing Boolean: true value</td>
        </tr>
        <tr>
            <td>false</td>
            <td>One of the primitive types, representing Boolean: false value</td>
        </tr>
        <tr>
            <td>null</td>
            <td>One of the primitive types, indicating a NULL value</td>
        </tr>
        <tr>
            <td>async</td>
            <td>Asynchronous calls</td>
        </tr>
    </tbody>
</table>


<div id="operator-table">

#### Operators
</div>

<table border=1px solid #51cbce; class="script-table" id="operator-table-table">
    <thead>
        <tr>
            <th colspan="2">Mathematical Operations</th>
            <th colspan="2">Comparative Operations</th>
            <th colspan="2">Logical Operations</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>+</td>
            <td>addition</td>
            <td>&lt;</td>
            <td>less than</td>
            <td>&&</td>
            <td>and</td>
        </tr>
        <tr>
            <td>-</td>
            <td>subtraction</td>
            <td>&lt;=</td>
            <td>less than or equal to</td>
            <td>||</td>
            <td>or</td>
        </tr>
        <tr>
            <td>*</td>
            <td>multiplication</td>
            <td>&gt;</td>
            <td>greater than</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>/</td>
            <td>division</td>
            <td>&gt;=</td>
            <td>greater than or equal to</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>%</td>
            <td>mod</td>
            <td>==</td>
            <td>equal to</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>++</td>
            <td>self-increment</td>
            <td>!=</td>
            <td>not equal to</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>--</td>
            <td>self-decrease</td>
            <td>===</td>
            <td>strictly equal to</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>!==</td>
            <td>strictly not equal to</td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

<div id="type-table">

#### Variable Types
</div>

<table border=1px solid #51cbce; class="script-table" id="type-table-table">
    <thead>
        <tr>
            <th>Type</th>
            <th>Grammer</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>byte</td>
            <td>123b, 123B</td>
        </tr>
        <tr>
            <td>short</td>
            <td>123s, 123S</td>
        </tr>
        <tr>
            <td>int</td>
            <td>123</td>
        </tr>
        <tr>
            <td>long</td>
            <td>123l, 123L</td>
        </tr>
        <tr>
            <td>float</td>
            <td>123f, 123F</td>
        </tr>
        <tr>
            <td>double</td>
            <td>123d, 123D</td>
        </tr>
        <tr>
            <td>BigDecimal</td>
            <td>123m, 123M</td>
        </tr>
        <tr>
            <td>boolean</td>
            <td>true, false</td>
        </tr>
        <tr>
            <td>string</td>
            <td>"hello"</td>
        </tr>
        <tr>
            <td>Pattern</td>
            <td><code>/\d+/g, /pattern/gimuy</code> To define regular expression</td>
        </tr>
        <tr>
            <td>lambda</td>
            <td>()=>expr, (param1,param2....)=>{...}</td>
        </tr>
        <tr>
            <td>list</td>
            <td>[1,2,3,4,5]</td>
        </tr>
        <tr>
            <td>map</td>
            <td>{key : value,key1 : value}</td>
        </tr>
    </tbody>
</table>





</div>
`

function UserManual() {
    return (
        <>
        <ReactMarkdown className="user-manual-outline" remarkPlugins={[gfm]} children={ markdown } />
        <ReactMarkdown className="user-manual-page-navigation" rehypePlugins={[rehypeRaw]} children={page_input} />
        {/* basic type */}
        <ReactMarkdown className="user-manual-page-navigation" rehypePlugins={[rehypeRaw]} children={basic_type_input} />
        <ReactMarkdown
            className="code-snippet"
            children={basic_type_code}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={duotoneLight}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                        )
                    }
                }}
        />

        {/* dynamic type */}
        <ReactMarkdown className="user-manual-page-navigation" rehypePlugins={[rehypeRaw]} children={dynamic_type_input} />
        <ReactMarkdown
            className="code-snippet"
            children={dynamic_type_code}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={duotoneLight}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                        )
                    }
                }}
        />

        {/* flexible type */}
        <ReactMarkdown className="user-manual-page-navigation" rehypePlugins={[rehypeRaw]} children={flexible_type_input} />
        <ReactMarkdown
            className="code-snippet"
            children={flexible_type_code}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={duotoneLight}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                        )
                    }
                }}
        />

        {/* multi-resource type */}
        <ReactMarkdown className="user-manual-page-navigation" rehypePlugins={[rehypeRaw]} children={multi_resource_type_input} />
        <ReactMarkdown
            className="code-snippet"
            children={multi_resource_type_code}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={duotoneLight}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                        )
                    }
                }}
        />

        <ReactMarkdown className="user-manual-page-navigation" rehypePlugins={[rehypeRaw]} children={script_grammar} />
        
        </>
    )
}

export default UserManual;