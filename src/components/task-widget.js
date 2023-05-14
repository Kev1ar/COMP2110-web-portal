import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from "../config.js";
import { getUser } from '../auth.js';

class TaskWidget extends LitElement {

  static MAX_TASKS = 4;
  static MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  static NUMBER_OF_TASKS = 15;

  static properties = {
    _pendingTasks: {}, // Array of pending task Objects (client-side) objects: {text: "", id: ""}
    _update: {state: true},
  }

  static styles = css`
    :host {
      --green: #86C232;
      --darkgreen: #61892F;
      --grey: #6B6E70;
      --dark-grey: #222629;

      width: 300px;
      min-height: 300px;
      height: 300px;
        padding: 15px 15px;

        font-family: 'Roboto';
        border: solid 1px black;
        border-radius: 10px;
        background-color: var(--dark-grey);
        color: #fff;
        font-size: 15px;
        text-align: left;
    }
    :host * {
      padding: 0;
      margin: 0;
    }


    .loading-message {
      text-align: center;
    }

    #header-template {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 3px;
    }
    
    h1 {
      font-size: 2em;
    }
    
    #update-button {
      width: 80px;
      padding: 8px;
      text-decoration: none;
      
      border: none;
      border-radius: 5px;
      background-color: var(--grey);

      color: #fff;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
      &:active {
        background-color: var(--darkgrey);
      }
    }
    

    .task-container{
      display:flex;
      align-items: center;

      padding: 5px 0px 5px 0px;
      border-bottom: grey solid 1px;
    }

    .task-label {
      margin-left: 10px;
      align-items: center;
      width: 280px;
      height: 40px;
      cursor: pointer;
      font-size: 1em;
      word-wrap: break-word;
    }

    .task-date {
      font-size: 0.9em;
      color: red;
    }

    #postform-container {
      margin-top:10px;
    }

    #postform-container form {
      display: flex;
      justify-content: space-between;
    }

    #task-title {
      flex-grow: 1;
      color: #fff;
      padding: 8px;
      border-radius: 5px;
      border: var(--grey) solid 1px;
      font-size: 1.1em;
      background-color: var(--dark-grey);
    }

    #postform-container button {
      width: 80px; 
      padding:8px;
      margin-left: 5px;
      border: none;
      border-radius: 5px;
     
      background-color: var(--darkgreen);
      color: #fff;
      cursor: pointer;
      font-weight: bold;
      &:hover {
        opacity: 0.7;
      }
      &:active {
        background-color: var(--darkgrey);
        border: var(--darkgrey) solid 2px;
      }
    } 
    #task-title::placeholder {
      font-weight: bold;
    }

    .task-checkbox {
      position: relative;
      width: 1.5em;
      height: 1.5em;
      color: #000;
      border: 1px solid var(--grey);
      border-radius: 4px;
      appearance: none;
      outline: 0;
      cursor: pointer;
      transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
      &::before {
        position: absolute;
        content: '';
        display: block;
        top: -1px;
        left: 4px;
        width: 8px;
        height: 14px;
        border-style: solid;
        border-color: #000;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
      }
      &:checked {
        
        box-sizing: border-box;
        color: white;
        border-color: var(--green);
        background: var(--green);
        &::before {
          opacity: 1;
        }
      }
    }
    
    .task-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 1em;
      padding: 0 0.25em 0;
      user-select: none;
    }

    .task-checkbox:checked + label {
      color: var(--grey);
      text-decoration: line-through;
      text-decoration-color: var(--green);
      text-decoration-thickness: 2px;
    }
  `;

  constructor() {
    super();
    if(getUser())
        this._fetchTasks();
    this._update = true;
  }

  connectedCallback() {
    super.connectedCallback();
  }

/***************************
        Fetch Methods
****************************/

/* 
  Fetchs the last NUM_OF_TASKS of tasks from server
  THEN Calls _getPendingTasks() and updates widget
*/
  _fetchTasks () {
    // FORMAT URL: tasks?start=X&count=3X
    fetch(`${BASE_URL}tasks?count=${TaskWidget.NUMBER_OF_TASKS}`, {
        headers: {
            Authorization: `Basic ${getUser().token}`,
            'Accept': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.tasks);
        this._getPendingTasks(data.tasks);
        this._update = !this._update;
    });
  }
  
  /*
    Takes task name & posts it to server
    After receiving response: stores new task object AT BEGINNNING of _pendingList
                              re-renders widget
  */

   _postTask (task_name) {
    const taskObject = { text: task_name }
    fetch(`${BASE_URL}tasks`, {
        method: "POST",
        body: JSON.stringify(taskObject),
        headers: { 
            Authorization: `Basic ${getUser().token}`,
            "Content-Type": "application/json",
            'Accept': 'application/json',
           },
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data); // debugger: print response payload for: POST
      const taskObject = {text: task_name, id: data.id};
      this._pendingTasks.unshift(taskObject);
      this._update = !this._update;
    })
    };

  _updateTaskStatus (task) {
    const newStatus = "completed";
    fetch(`${BASE_URL}tasks/${task.id}`, {
        method: "POST",
        body: JSON.stringify( {status: newStatus} ),
        headers: { 
            Authorization: "Basic " + getUser().token,
            "Content-Type": "application/json" },
    })
    .then(() => {
      const index = this._pendingTasks.indexOf(task);
      this._pendingTasks.splice(index,1);
      this._update = !this._update;
    });
  }

 

/** 
 * Sets status of all tasks on the server
 * WARNING: remove fetchTasks from _updateTaskStatus before use (prevent OVERLOAD)
 */
_setAllTaskStatus () {
  this._taskData.forEach( task => {this._updateTaskStatus (task)})
}

/***************************
      Templates & Helper Methods
***************************/

  _headerTemplate() {
    return html`
    <div id="header-template">
      <h1 id="title"># todo.</h1>
      <button id="update-button" title="Use this button to remove checked off tasks" @click="${() => this._handleUpdate()}"> Remove</button>
    </div>
    `;
  }

  /*
    UPDATE BUTTON HANDLER
    - Gets list of checkboxes from widget
    - If box is checked, post task as completed
    - remove task from client-side _pendingTasks
    - re-render
  */
    _handleUpdate() {
    const checkBoxList = this.shadowRoot.querySelectorAll(".task-checkbox");
    for(let i = 0; i < checkBoxList.length; i++){
      // debug statement: check if checkBoxList mirrors items in _pendingTasks
      // console.log(`${checkBoxList[i].id} == ${this._pendingTasks[i].id}`)
      if(checkBoxList[i].checked)
        this._updateTaskStatus(this._pendingTasks[i]);
    }
  }

  _tasksTemplate() {
    return html`${this._pendingTasks.map( (task) => { 
      return html`
        <div class="task-container">
          <input class="task-checkbox" 
            id="${task.id}" 
            name="${task.id}" 
            value="${task.id}" 
            type="checkbox">
          <label class="task-label" 
            for="${task.id}" 
            data-content=" ${task.text}"> ${task.text} </label>
        </div>
        `
      })}`
    }
  
    _getTaskDate(task) {
      const date = new Date(task.timestamp);
      return html`${date.getDate()} ${TaskWidget.MONTHS[date.getMonth()]}`;
    }

  _taskFormTemplate() {
    return html`
    <div id="postform-container">
        <form action="" id="submitForm"> 
          <input type="text" id="task-title" placeholder="Task name" maxlength="50">
          <button type="submit" @click="${(e) => {
                  e.preventDefault();
                  this._handleSubmit();
          }}">Add Task</button>
        </form>
      </div>
    `;
  } 

  /** 
   * SUBMIT TASK HANDLER
   */
  _handleSubmit() {
    if(this._pendingTasks.length >= TaskWidget.MAX_TASKS){
      alert("Maximum task limit reached.  Try getting some things done first!"); 
      return;
    }
    let taskTitle = this.shadowRoot.getElementById("task-title");
    this._postTask (taskTitle.value);
    taskTitle.value = "";
  }

  /** 
   * Extracts a #number of pending tasks into _pendingTasks array, then re-renders widget
   * Array is in order of MOST RECENT tasks first
   */
  _getPendingTasks(taskData) {
    this._pendingTasks = [];
    for(let i = 0; i < taskData.length && this._pendingTasks.length < TaskWidget.MAX_TASKS; i++) {
      if(taskData[i].status === "pending"){
        let taskObject = {text: taskData[i].text, id: taskData[i].id}
        this._pendingTasks.push(taskObject);
      }
    }
    console.log(this._pendingTasks); // prints out list of pending tasks
    this._update = !this._update;
  }


  render() {
    if(!getUser())
      return html`<h3 class="loading-message">Please Login to Access Tasks...</h3>`;
    if(!this._pendingTasks)
      return html`<h3 class="loading-message">Fetching Tasks, Please Wait...</h3>`;
    return html`
      ${this._headerTemplate()}
      ${this._tasksTemplate()}
      ${this._taskFormTemplate()}
    `;
    }
  
}

customElements.define('task-widget', TaskWidget);