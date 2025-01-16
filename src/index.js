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
        if(addProjectDialog.returnValue !== "cancel"){
            const input = JSON.parse(addProjectDialog.returnValue)
            console.log(`${input.name} ${input.isComplete}`);
        }

        viewManager.resetAddProjectForm();
        
    })

    
    saveProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        const projectName = viewManager.getElement("#project-name").value;
        const isProjectComplete = viewManager.getElement("#is-complete").checked;
        const input = {
            name: projectName,
            isComplete: isProjectComplete,
        };
        addProjectDialog.close(JSON.stringify(input));
    })


    viewManager.displayProjectsOnSidebar(projects);


}(view, projects);