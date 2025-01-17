

export const ViewManager = function(){

    const sideBar = getElement("#sidebar");
    const sideBarDetails = getElement("#sidebar-details");
    const addProjectDialog = getElement("#add-project-dialog");
    const addToDoDialog = getElement("#add-todo-dialog");
    const display = getElement("#display");



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

    const showAddToDoDialog = function(){
        addToDoDialog.showModal();
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


    const displayProjectsOnSidebar = function(projects, handler){

        removeProjectsFromSidebar();
        const projectsNav = createElementWithId("nav", "projects-nav");
        const projectsList = createElementWithId("ul", "projects-list");

        for(let i = 0; i < projects.length; i++){

            const projectListItem = createElementWithClass("li", "project");
            const projectButton = createElementWithClass("button", "project-button");
            projectButton.dataset.indexNumber = i;
            projectButton.addEventListener("click", handler);
            projectButton.textContent = projects[i].name;
            projectListItem.appendChild(projectButton);
            projectsList.append(projectListItem);


        }

        projectsNav.append(projectsList);
        sideBarDetails.append(projectsNav);
        

    }

    function createToDoElements(todo){
        
        const header = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");

        header.textContent = todo.title;
        p1.textContent = todo.description;
        p2.textContent = `Due Date: ${todo.dueDate}`;
        p3.textContent = `Priority: ${todo.priority}`;


        return {
            header,
            p1,
            p2,
            p3
        };
    }

    function createButtonGroup(todo){
        const buttonGroup = createElementWithClass("div", "button-group");
        const checkboxDiv = document.createElement("div");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");


        // SET/APPEND LABEL AND CHECKBOX
        label.setAttribute("for", "status");
        label.textContent = "Status: ";

        checkboxDiv.appendChild(label);

        checkbox.setAttribute("type", "checkbox");
        checkboxDiv.appendChild(checkbox);

        buttonGroup.appendChild(checkboxDiv);

        // SET/APPEND EDIT AND DELETE BUTTON
        const divContainer = document.createElement("div");
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        divContainer.appendChild(editButton);
        divContainer.appendChild(deleteButton);
        buttonGroup.appendChild(divContainer);

        return buttonGroup;
    }


    function appendElements(elmnts, displayItem){

        for(const key in elmnts){
            displayItem.appendChild(elmnts[key]);
        }

    }


    const resetDisplay = function(){
        display.textContent = "";
    }

    const displayToDos = function(project){

        const projectHeader = document.createElement("h2");
        const addToDoButton = document.createElement("button");
        const displayGrid = createElementWithId('div', 'display-grid');
        const headerContainer = createElementWithId("header", "header-container");

        projectHeader.textContent = `${project.name}`;
        headerContainer.appendChild(projectHeader);
        addToDoButton.textContent = 'Add To Do';
        addToDoButton.addEventListener("click", showAddToDoDialog);
        headerContainer.appendChild(addToDoButton);
        display.appendChild(headerContainer);

        if(project.toDoList.length  === 0){
            const emptyProjectDiv = document.createElement("p");
            emptyProjectDiv.textContent = "This Project is empty";
            display.appendChild(emptyProjectDiv);
            return;
        }
        


        for(let i = 0; i < project.toDoList.length; i++){
            const displayItem = createElementWithClass("div", "display-item");
            const elmnts = createToDoElements(project.toDoList[i]);
            const buttonGroup = createButtonGroup(project.toDoList[i]);

            appendElements(elmnts, displayItem);
            displayItem.appendChild(buttonGroup);

            displayGrid.appendChild(displayItem);
            

        }

        display.appendChild(displayGrid);


    }


    return {
        displayProjectsOnSidebar,
        createElementWithClass,
        createElementWithId,
        getElement,
        showAddProjectDialog,
        resetAddProjectForm,
        displayToDos,
        resetDisplay,


    }

}

    

    


