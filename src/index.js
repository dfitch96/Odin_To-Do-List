import "./styles.css";
import {Project} from "./modules/project.js";
import {ViewManager} from "./modules/view_manager.js";


const projects = [];
projects.push(new Project("Home"));
const view = ViewManager();



const App = function(viewManager, projects){

    const sideBar = viewManager.getElement("#sidebar");
    const addProjectButton = viewManager.getElement("#add-project-button");
    const saveProjectButton = viewManager.getElement("#save-project-button");
    const addProjectDialog = viewManager.getElement("#add-project-dialog");


    

    addProjectButton.addEventListener("click", () => {
        viewManager.showAddProjectDialog();
    })

    addProjectDialog.addEventListener("close", (event) => {
        if(addProjectDialog.returnValue === "save"){
            const projectName = viewManager.getElement("#project-name").value;
            projects.push(new Project(projectName))
            viewManager.displayProjectsOnSidebar(projects);
        }

        viewManager.resetAddProjectForm();
        
        
    })

    
    saveProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        addProjectDialog.close(event.target.value);
    })


    viewManager.displayProjectsOnSidebar(projects);


}(view, projects);