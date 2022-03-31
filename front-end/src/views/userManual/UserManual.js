import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
import 'react-tabs/style/react-tabs.css';
import './userManual.css';
import Code1 from 'assets/img/Code1.png';
import Code2 from 'assets/img/Code2.png';
import Code3 from 'assets/img/Code3.png';
import Code4 from 'assets/img/Code4.png';

function UserManual() {
   
    return (
        <>
            <Tabs className="TabContents">
                <TabList>
                <Tab>Page Navigation</Tab>
                <Tab>Definition Types</Tab>
                <Tab>Script Language</Tab>
                </TabList>

                <TabPanel className="firstContent">
                <div>
                    <h4>Home Page</h4>
                    - This page introduces the software briefly.
                
                </div>

                <div>
                    <h4>Assignment Page </h4>

                    <h5><b>Manager</b> </h5>
                    <li>New Schedule <br/>
                    <p>
                    This page allows to write and send description messages to Planners. &nbsp;
                    All the history of the sent description messages could be checked.</p> 

                    *Managers should include all the information needed to build a schedule in the message to inform Planners.  
                    </li>

                    <br/>

                    <li>Invitation <br/>
                    <p>
                    This page generates the token needed for a new Planner register.</p> 

                   
                    </li>

                    <h5><b>Planner</b> </h5>
                    <li>New Schedule <br/>
                    <p>
                    This page shows received schedule description messages classified by the sent manager.</p>
                    </li>

                </div>

                <div>
                    <h4>Definition Page</h4>
                    <p>
                    This page allows Planners to define Job shop scheduling problems by writing or importing the script, based on JSSP type.<br/>
                    Generates a computed schedule in a Gantt chart.</p>

                
                </div>


                <div>
                <h4>Evaluation Page </h4>

                
                <li>My Schedule<br/>
                <p>
                This page shows all schedules, regardless of whether the schedule is finished or ongoing.</p> 
                </li>

                </div>

                </TabPanel>

                <TabPanel className="secondContent">
                <h4>Definition Types for Job Shop Scheduling Problem (JSSP)</h4>
                <i className="nc-icon nc-bulb-63" />&nbsp;&nbsp;You can explore algorithms &nbsp; <a href='https://developers.google.com/optimization/scheduling/job_shop'>click here</a> <br/><br/>
                <div>
                <h5>Basic Type</h5>
                <p>It is the foundmental type of JSSP. Every other types are based on this type.<br/> <br/>
                All operations for one job are performed in a predetermined order.</p><br/>
                <p>
                Users should define<br/>
                <li>job data: including tasks for each job, machine id and duration for each task. Tasks within one job are constrained by their precedence. </li>
                <li>job names (optional): the order and length should be same as the definition of job data. Use <em>job_names</em> as keyword.</li>
                <li>machine names (optional): the order and length should be same as the index of the machine defined in job data. Use <em>machine_names</em> as keyword.</li>
                <li>use <em>model.runModel(type=1, originalData=js)</em></li> <br/>
                
                See code snippet below👇:<br/>
                <img className='CodeImg' alt='CodeImg' align="center" src={Code1} style={{width:"310", height:"360px" }}/> 
                </p>

                </div>


                <div>
                <h5>Dynamic Type</h5>
                <p>Dynamic Type allows you to set priorities for different jobs.<br/> <br/>
                There are various ways to set priorities for different jobs. Here we simply use the expected duration to set priorities in ascending order.\</p><br/>
                That is to say, job with shortest expected duration will have highest priority and vice versa.<br/> <br/>
                <p>
                Users should define<br/>
                <li>job data: including tasks for each job, machine id and duration for each task. Tasks within one job are constrained by their precedence. </li>
                <li>expected duration: the order and length should be same as the definition of job data.</li>
                <li>job names (optional): the order and length should be same as the definition of job data. Use<em>job_names</em> as keyword.</li>
                <li>machine names (optional): the order and length should be same as the index of the machine defined in job data. Use <em>machine_names</em> as keyword.</li>
                <li>choose <em>model.runBasic()</em></li> <br/>
                See code snippet below👇:<br/>
                <img className='CodeImg' alt='CodeImg' align="center" src={Code2} style={{width:"310", height:"360px" }}/> 
                </p>

                </div>

                <div>
                <h5>Fixible Type</h5>
                <p>Flexible type allows you to choose one of identical machines for one task.<br/> <br/>
                While different machines in same category might have different performances.</p><br/>
               
                <p>
                Users should define<br/>
                <li>job data: including tasks for each job, machine id and duration for each task. Tasks within one job are constrained by their precedence.</li>
                <li>job names (optional): the order and length should be same as the definition of job data. Use <em>job_names</em> as keyword.</li>
                <li>machine names (optional): the order and length should be same as the index of the machine defined in job data. Use <em>machine_names</em> as keyword.</li>
                <li>choose <em>model.Flexible()</em></li> <br/>
                See code snippet below👇:<br/>
                <img className='CodeImg' alt='CodeImg' align="center" src={Code3} style={{width:"310", height:"360px" }}/> 
                </p>

                </div>

                <div>
                <h5>Multi-Resource Type</h5>
                <p>Multi-Resource type allows one task to run concurrently if it has two or more concurrent procedures with different machines/resources.<br/> <br/>
                The script definition for job data is same with Flexible Type, but please pay attention to the different meanings in different types.</p><br/>
               
                <p>
                Users should define<br/>
                <li>job data: including tasks for each job, machine id and duration for each task. Tasks within one job are constrained by their precedence. </li>
                <li>job names (optional): the order and length should be same as the definition of job data. Use <em>job_names</em> as keyword.</li>
                <li>machine names (optional): the order and length should be same as the index of the machine defined in job data. Use <em>machine_names</em>as keyword.</li>
                <li>choose <em>model.runMulti()</em></li> <br/>
                See code snippet below👇:<br/>
                <img className='CodeImg' alt='CodeImg' align="center" src={Code4} style={{width:"310", height:"360px" }}/> 
                </p>

                </div>

                </TabPanel>

                <TabPanel className="thirdContent">
                <div>
                <h5>Script Grammer</h5>
                <li>JSSP Related Grammer and Functions</li>
                <Card>
                <Table>
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
                        <td></td>
                    </tr>
                    <tr>
                        <td>model.runModel()</td>
                        <td>To run the model. There are two parameters: <i>index</i> and <i>originalData</i>.<br/>
                            Users need to specify type index for each type.<br/>
                            Basic Type: 1<br/>
                            Dynamic Type: 2<br/>
                            Flexible Type: 3<br/>
                            Multi-Resource Type: 4<br/><br/>
                            Users need to convert their data format to JSON for Basic and Dynamic Types.<br/>
                            Users need to set originalData=null for Flexible and Multi-Resource Types.<br/>
                        </td>
                        <td>return model.runModel(index=1, originalData=jsData)<br/>
                            return model.runModel(index=3, originalData=null)
                        </td>
                    </tr>
                </tbody>

            </Table>
            </Card>

            <li>Other Keywords</li>
            <Card>
            <Table responsive>
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
            </Table>
            </Card>

            <li>Operators</li>
            <Card>
            <Table >
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
                        <td>&amp;&amp;</td>
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
            </Table>

            </Card>


            <li>Variable Types</li>

            <Card>
            <Table>
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
                        <td>()=&#62;expr, (param1,param2....)=&#62;&#123;...&#125;</td>
                    </tr>
                    <tr>
                        <td>list</td>
                        <td>[1,2,3,4,5]</td>
                    </tr>
                    <tr>
                        <td>map</td>
                        <td>&#123;key : value,key1 : value&#125;</td>
                    </tr>
                </tbody>
            </Table>

            </Card>



                </div>
                </TabPanel>

            </Tabs>
        </>
    )
}

export default UserManual;