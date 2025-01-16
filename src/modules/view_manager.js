

export const ViewManager = function(){

    const sideBar = getElement("#sidebar");
    const sideBarDetails = getElement("#sidebar-details");
    const addProjectDialog = getElement("#add-project-dialog");




    function createElementWithClass(tag, className){
        const newElement = document.createElement(tag);
        newElement.classList.add(className);
        return newElement;
    }

    function createElementWithId(tag, id){
        const newElement = document.createElement(tag);
        newElement.setAttribute("id", id);
        return newElement;
    }

    function getElement(selector){
        const element = document.querySelector(selector);
        return element;
    }



    const showAddProjectDialog = function(){
        addProjectDialog.showModal();
    }

    const resetAddProjectForm = function(){
        const form = addProjectDialog.querySelector(".form-container");
        form.reset();
    }

    const removeProjectsFromSidebar = function(){
        
        if (sideBarDetails.firstChild !== sideBarDetails.lastChild){
            sideBarDetails.removeChild(sideBarDetails.lastChild);
        }
        
    }


    const displayProjectsOnSidebar = function(projects){

        removeProjectsFromSidebar();
        const projectsNav = createElementWithId("nav", "projects-nav");
        const projectsList = createElementWithId("ul", "projects-list");

        for(let i = 0; i < projects.length; i++){

            const projectListItem = createElementWithClass("li", "project");
            projectListItem.dataset.indexNumber = i;
            const projectButton = createElementWithClass("button", "project-button");
            projectButton.textContent = projects[i].name;
            projectListItem.appendChild(projectButton);
            projectsList.append(projectListItem);


        }

        projectsNav.append(projectsList);
        sideBarDetails.append(projectsNav);
        

    }


    


    return {
        displayProjectsOnSidebar,
        createElementWithClass,
        createElementWithId,
        getElement,
        showAddProjectDialog,
        resetAddProjectForm,


    }

}

    

    


