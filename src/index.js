import "./styles.css";
import {Project} from "./modules/project.js";
import {ViewManager} from "./modules/view_manager.js";


const projects = [];
const project = new Project("Home");
project.addToDo("Get Groceries", "Go to Tops. I need bananas, cereal, and milk", "2025-01-23", "high");
projects.push(project);
const view = ViewManager();



const App = function(viewManager, projects){

    // ADD PROJECT ELEMENTS
    const addProjectDialog = viewManager.getElement("#add-project-dialog");
    const addProjectButton = viewManager.getElement("#add-project-button");
    const saveProjectButton = viewManager.getElement("#save-project-button");
    
    // ADD TODO ELEMNTS
    const addToDoDialog = viewManager.getElement("#add-todo-dialog");
    const saveToDoButton = viewManager.getElement("#save-todo-button");


    const bindDisplayHandlers = function(){
        viewManager.bindAddToDoButtonOnClick(handleAddToDoOnClick);
        viewManager.bindDeleteButtonOnClick(handleDeleteToDoOnClick);
        viewManager.bindEditButtonOnClick(handleEditToDoOnClick);
        viewManager.bindStatusCheckboxOnClick(handleStatusToggle);
    }



    //HANDLERS

    const handleProjectOnClick = (event) => {
        const index = event.target.dataset.indexNumber;
        viewManager.resetDisplay();
        viewManager.displayToDos(projects[index], index);
        bindDisplayHandlers();
    };


    const handleAddToDoOnClick = function(){
        viewManager.showAddToDoDialog();
    }

    const handleEditToDoOnClick = function(event){
        console.log(`Editing task ${event.target.dataset.id} from project ${event.target.dataset.indexNumber}`);

        const id = Number(event.target.dataset.id);
        const project = projects[event.target.dataset.indexNumber];
        viewManager.showEditToDoDialog(id, project.getToDo(id));
    }

    const handleDeleteToDoOnClick = function(event){
        console.log(`Deleting task ${event.target.dataset.id} from project ${event.target.dataset.indexNumber}`);
        
        projects[event.target.dataset.indexNumber].deleteToDo(Number(event.target.dataset.id));
        viewManager.resetDisplay();
        viewManager.displayToDos(projects[event.target.dataset.indexNumber], event.target.dataset.indexNumber);
        bindDisplayHandlers();


    }

    const handleStatusToggle = function(event){
        console.log(`Toggling status for task ${event.target.dataset.id} from project ${event.target.dataset.indexNumber}`);
        const projectIndex = event.target.dataset.indexNumber;
        const id = event.target.dataset.id;
        projects[projectIndex].toggleIsComplete(Number(id));
        viewManager.resetDisplay();
        viewManager.displayToDos(projects[event.target.dataset.indexNumber], event.target.dataset.indexNumber);
        bindDisplayHandlers();
    }

    
    // EVENTS FOR ADDING A PROJECT
    addProjectButton.addEventListener("click", () => {
            viewManager.showAddProjectDialog();
    });

    saveProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        viewManager.closeAddProjectDialog(event.target.value);
    });

    addProjectDialog.addEventListener("close", (event) => {
        if(addProjectDialog.returnValue === "save"){
            const projectName = viewManager.getElement("#project-name").value;
            projects.push(new Project(projectName))
            viewManager.displayProjectsOnSidebar(projects);
            viewManager.bindProjectsOnClick(handleProjectOnClick);
        }

        viewManager.resetAddProjectForm();
        
        
    });

   
    // EVENTS FOR ADDING A TODO TO A PROJECT
 
    addToDoDialog.addEventListener("close", (event) => {

        // if save buttons was clicked
        if(addToDoDialog.returnValue === "save"){
            
            const projectIndex = document.querySelector("#display-grid").dataset.indexNumber;

            // reset view and display updated list
            viewManager.resetDisplay();
            viewManager.displayToDos(projects[projectIndex], projectIndex);
            bindDisplayHandlers();
        }
        
        viewManager.resetAddToDoForm();

    });

    saveToDoButton.addEventListener("click", (event) => {
        event.preventDefault();

        const form = addToDoDialog.querySelector(".form-container");
        const projectIndex = document.querySelector("#display-grid").dataset.indexNumber;
        const id = form.dataset.id;

        const formData = new FormData(form);

        const updatedProperties = {
            title: formData.get("title"),
            description: formData.get("description"),
            dueDate: formData.get("duedate"),
            priority: formData.get("priority"),
        }


        if(id){
            projects[projectIndex].editToDo(Number(id), updatedProperties);
        } else{
            projects[projectIndex].addToDo(
                updatedProperties.title, 
                updatedProperties.description, 
                updatedProperties.dueDate, 
                updatedProperties.priority
            );
        }


        viewManager.closeAddToDoDialog(event.target.value);
    })



    viewManager.displayProjectsOnSidebar(projects);
    viewManager.bindProjectsOnClick(handleProjectOnClick);


}(view, projects);