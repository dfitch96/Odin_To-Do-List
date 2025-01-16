import "./styles.css";
import {Project} from "./modules/project.js";
import {ViewManager} from "./modules/view_manager.js";


const projects = [];
projects.push(new Project("Home"));
projects.push(new Project("New Project"));
const view = ViewManager();



const App = function(viewManager, projects){




    

    viewManager.displayProjectsOnSidebar(projects);


}(view, projects);