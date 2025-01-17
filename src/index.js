import "./styles.css";
import {Project} from "./modules/project.js";
import {ViewManager} from "./modules/view_manager.js";


const projects = [];
const project = new Project("Home");
project.addToDo("Get Groceries", "Go to Tops. I need bananas, cereal, and milk", "1/17/2025", "high");
project.addToDo("Get Groceries", "Go to Tops. I need bananas, cereal, and milk", "1/17/2025", "high");
projects.push(project);
const view = ViewManager();



const App = function(viewManager, projects){

    const sideBar = viewManager.getElement("#sidebar");

    // ADD PROJECT ELEMENTS
    const addProjectDialog = viewManager.getElement("#add-project-dialog");
    const addProjectButton = viewManager.getElement("#add-project-button");
    const saveProjectButton = viewManager.getElement("#save-project-button");
    
    // ADD TODO ELEMNTS
    const addToDoDialog = viewManager.getElement("#add-todo-dialog");
    const saveToDoButton = viewManager.getElement("#save-todo-button");



    const handleProjectOnClick = (event) => {
        const index = event.target.dataset.indexNumber;
        viewManager.resetDisplay();
        viewManager.displayToDos(projects[index]);
    }
    


    // EVENTS FOR ADDING A PROJECT
    addProjectButton.addEventListener("click", () => {
            viewManager.showAddProjectDialog();
    })

    addProjectDialog.addEventListener("close", (event) => {
        if(addProjectDialog.returnValue === "save"){
            const projectName = viewManager.getElement("#project-name").value;
            projects.push(new Project(projectName))
            viewManager.displayProjectsOnSidebar(projects, handleProjectOnClick);
        }

        viewManager.resetAddProjectForm();
        
        
    })

    saveProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        addProjectDialog.close(event.target.value);
    })


    // EVENTS FOR ADDING A TODO TO A PROJECT



    viewManager.displayProjectsOnSidebar(projects, handleProjectOnClick);


}(view, projects);