import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from "../config.js";
import { getUser } from '../auth.js';

class TaskWidget extends LitElement {

  static MAX_TASKS = 4;
  static MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  static properties = {
    _taskData: {}, // Array of task Objects
    _pendingTasks: {}, // Array of pending task Objects
    _update: {state:true},
  }

  static styles = css`
    :host {
      --green: #86C232;
      --darkgreen: #61892F;
      --grey: #6B6E70;
      --dark-grey: #222629;
    }


    :host {
        width: 300px;
        height: 300px;
        min-height: 300px;
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
    
    #post-button {
      text-decoration: none;
      margin-right: 10px;
      height: 40px;
      width: 80px;
      
      border: var(--grey) solid 2px;
      border-radius: 10px;
      background-color: var(--grey);

      color: #fff;
      font-weight: bold;
      cursor: pointer;
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
      font-weight: bold;
      background-color: var(--dark-grey);
    }

    #postform-container button {
      margin-left: 5px;
      border: none;
      border-radius: 5px;
      padding:8px;
      background-color: var(--darkgreen);
      color: #fff;
      font-weight: bold;
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
        border-color: #fff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
      }
      &:checked {
        box-sizing: border-box;
        color: white;
        border-color: green;
        background: green;
        &::before {
          opacity: 1;
        }
      }
    }
    
    .task-label {
      position: relative;
      cursor: pointer;
      font-size: 1em;
      padding: 0 0.25em 0;
      user-select: none;
    }

    .task-checkbox:checked + label {
      text-decoration: line-through;
    }
  `;

  constructor() {
    super();
    this._update = true;
    this._pendingTasks = [];
    if(getUser())
        this._fetchTasks();
  }

  connectedCallback() {
    super.connectedCallback();
  }


/***************************
        Fetch Methods
****************************/

  _fetchTasks () {
    // FORMAT URL: tasks?start=X&count=3X
    // UNOPTIMIZED: ONLY WORKS WITH X TASKS (PREVENT OVERLOADING)
    fetch(`${BASE_URL}tasks?count=50`, {
        headers: {
            Authorization: `Basic ${getUser().token}`,
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        this._taskData = data.tasks;
        this._getPendingTasks();
        console.log()
        // console.log(this._taskData.length);
        // console.log("Tasks Fetched");
        // console.log(this._taskData);
    });
  }
  
  _postTask (task_name) {
    const taskObject = { text: task_name }
    fetch(`${BASE_URL}tasks`, {
        method: "POST",
        body: JSON.stringify(taskObject),
        headers: { 
            Authorization: "Basic " + getUser().token,
            "Content-Type": "application/json" },
    })
    .then(() => {
      console.log(`New Task Posted: ${task_name}`);
      this._fetchTasks();
      });
    };

  _updateTaskStatus (task) {
    // let newStatus = (task.status === "pending") ? "completed" : "pending";
    const newStatus = "completed";
    fetch(`${BASE_URL}tasks/${task.id}`, {
        method: "POST",
        body: JSON.stringify( {status: newStatus} ),
        headers: { 
            Authorization: "Basic " + getUser().token,
            "Content-Type": "application/json" },
    })
    .then(() => {
      console.log(`# Status Updated`);
      const index = this._pendingTasks.indexOf(task);
      this._pendingTasks.splice(index,1);
      this._update = !this._update;
    });
  }

 

/** 
 * Set status of all tasks on server.
 * WARNING: remove fetchTasks from _updateTaskStatus before use (prevent OVERLOAD)
 */
_setAllTaskStatus () {
  this._taskData.forEach( task => {this._updateTaskStatus (task)})
}

/***************************
      Templates Methods 
***************************/

  _headerTemplate() {
    return html`
    <div id="header-template">
      <h1 id="title"># todo.</h1>
      <button id="post-button" @click="${() => this._handlePost()}"> Update</button>
    </div>
    `;
  }

  _handlePost() {
    const checkBoxList = this.shadowRoot.querySelectorAll(".task-checkbox");
    console.log(checkBoxList);
    console.log(this._pendingTasks);
    for(let i = 0; i < checkBoxList.length; i++){
      if(checkBoxList[i].checked){
        this._updateTaskStatus(this._pendingTasks[i]);
      }
    }
    this._fetchTasks();
  }

  _handlePost2(task_object) {
    const checkBoxList = this.shadowRoot.querySelectorAll(".task-checkbox");
    const div= this.shadowRoot.querySelectorAll(".task-checkbox");
    console.log(checkBoxList);

  }

  _tasksTemplate() {
    return html`${this._pendingTasks.map( (task) => { 
      return html`
        <div class="task-container">

          <input class="task-checkbox" id="${task.id}" name="${task.id}" value="${task.id}" type="checkbox">
          <label class="task-label" for="${task.id}" data-content=" ${task.text}"> ${task.text} </label>


        </div>
        `
      })}`
    }
          // <input @click="${() => this._handlePost2(task)}" class="task-checkbox" id="${task.id}" type="checkbox" />
          // <label class="task-title" for="${task.id}">
          //   ${task.text}
          // </label>
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
                  this._handleForm();
          }}">Add Task</button>
        </form>
      </div>
    `;
  } 

  /** 
   * Handles form SUBMIT & NEW TASK creation
   */
  _handleForm() {
    if(this._pendingTasks.length >= TaskWidget.MAX_TASKS){
      alert("Maximum task limit reached. Try ticking some tasks off!"); 
      return;
    }
    let taskTitle = this.shadowRoot.getElementById("task-title");
    // console.log(taskTitle.value);
    // this._postTask (taskTitle.value);
    this._postTask ("40 characters is about 1 sentence. A sentence.");
    taskTitle.value = "";
  }

  /** 
   * Extracts #[MAX_TASKS] pending tasks into _pendingTasks array
   */
  _getPendingTasks() {
    this._pendingTasks = [];
    for(let i = 0; i < this._taskData.length && this._pendingTasks.length < TaskWidget.MAX_TASKS; i++) {
      if(this._taskData[i].status === "pending")
        this._pendingTasks.push(this._taskData[i]);
    }
    console.log(this._pendingTasks);
    this._update = !this._update;
  }

  render() {
    if(getUser() && this._taskData) {
      return html`
        ${this._headerTemplate()}
        ${this._tasksTemplate()}
        ${this._taskFormTemplate()}
      `;
    }
    return html`<h3 id="loading-message">Please Login to Access Tasks...</h3>`;
  }
}

customElements.define('task-widget', TaskWidget);