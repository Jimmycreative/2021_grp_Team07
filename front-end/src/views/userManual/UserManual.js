import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw'

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
    * [**Flexible Type**](#flexible-type)
    * [**Dynamic Type**](#dynamic-type)
    * [**Multi-Resource Type**](#multi-resource-type)
* [**3. Script Language**](#script-language)
`
const page_input = `
<div id="page-navigation">

# Some *emphasis* and <strong>strong</strong>!
### Page Navigation
</div>

<div class="page-content1">
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
</div>
</div>
`
const definition_input=`
<div id="definition-types">

### Definition Types
</div>
<div class="page-content2">

<div id="basic-type">

#### Basic Type
</div>

<div id="flexible-type">

#### Flexible Type
</div>

<div id="dynamic-type">

#### Dynamic Type
</div>

<div id="multi-resource-type">

#### Multi-Resource Type
</div>

</div>
`
function UserManual() {
    return (
        <>
        <ReactMarkdown className="user-manual-outline" remarkPlugins={[gfm]} children={ markdown } />
        <ReactMarkdown className="user-manual-page-navigation" rehypePlugins={[rehypeRaw]} children={page_input} />
        <ReactMarkdown className="user-manual-page-navigation" rehypePlugins={[rehypeRaw]} children={definition_input} />
        
        </>
    )
}

export default UserManual;