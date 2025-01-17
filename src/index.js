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
    const addProjectButton = viewManager.getElement("#add-project-button");
    const saveProjectButton = viewManager.getElement("#save-project-button");
    const addProjectDialog = viewManager.getElement("#add-project-dialog");



    const handleProjectOnClick = (event) => {
        const index = event.target.dataset.indexNumber;
        viewManager.resetDisplay();
        viewManager.displayToDos(projects[index]);
        
        
    }
    

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


    viewManager.displayProjectsOnSidebar(projects, handleProjectOnClick);


}(view, projects);