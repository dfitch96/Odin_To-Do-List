

export const ViewManager = function(){

    const sideBar = getElement("#sidebar");
    const sideBarDetails = getElement("#sidebar-details");
    const addProjectDialog = getElement("#add-project-dialog");
    const addToDoDialog = getElement("#add-todo-dialog");
    const display = getElement("#display");


    // HELPER FUNCTIONS
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

  




    // SIDEBAR FUNCTIONS

    const showAddProjectDialog = function(){
        addProjectDialog.showModal();
    }

    const resetAddProjectForm = function(){
        const form = addProjectDialog.querySelector(".form-container");
        form.reset();
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

    const removeProjectsFromSidebar = function(){
        
        if (sideBarDetails.firstChild !== sideBarDetails.lastChild){
            sideBarDetails.removeChild(sideBarDetails.lastChild);
        }
        
    }






    // MAIN DISPLAY FUNCTIONS


    const showAddToDoDialog = function(){
        addToDoDialog.showModal();
    }

    const resetAddToDoForm = function(){
        const form = addToDoDialog.querySelector(".form-container");
        form.reset();
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


    function setButton(button, text, index, id, value){
        button.textContent = text;
        button.dataset.indexNumber = index;
        button.dataset.id = id;
        button.value = value
    }

    function createButtonGroup(indexNumber, id){
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
        checkbox.classList.add("status-checkbox");
        checkbox.dataset.indexNumber = indexNumber;
        checkbox.dataset.id = id;
        
        checkboxDiv.appendChild(checkbox);

        buttonGroup.appendChild(checkboxDiv);

        // SET/APPEND EDIT AND DELETE BUTTON
        const divContainer = document.createElement("div");
        setButton(editButton, "Edit", indexNumber, id, "edit");
        setButton(deleteButton, "Delete", indexNumber, id, "delete");
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

    const displayToDos = function(project, index, handler){

        const projectHeader = document.createElement("h2");
        const addToDoButton = document.createElement("button");
        const displayGrid = createElementWithId('div', 'display-grid');
        const headerContainer = createElementWithId("header", "header-container");

        // append header and add to do button to display
        projectHeader.textContent = `${project.name}`;
        headerContainer.appendChild(projectHeader);
        addToDoButton.textContent = 'Add To Do';
        addToDoButton.addEventListener("click", showAddToDoDialog);
        headerContainer.appendChild(addToDoButton);
        display.appendChild(headerContainer);

        // if current projects to do list is empty, display "project is empty text" and add projects index
        // to the displayGrid
        if(project.toDoList.length  === 0){
            const emptyProjectDiv = document.createElement("p");
            emptyProjectDiv.textContent = "This Project is empty";
            display.appendChild(emptyProjectDiv);
            displayGrid.dataset.indexNumber = index;
            display.appendChild(displayGrid);
            return;
        }
        

        // for every To Do within the project, append a display-item to the display-grid
        for(let i = 0; i < project.toDoList.length; i++){
            const displayItem = createElementWithClass("div", "display-item");
            displayItem.addEventListener("click", handler);
            displayItem.dataset.id = project.toDoList[i].id;
            
            const elmnts = createToDoElements(project.toDoList[i]);
            const buttonGroup = createButtonGroup(index, project.toDoList[i].id);

            appendElements(elmnts, displayItem);
            displayItem.appendChild(buttonGroup);
            displayGrid.appendChild(displayItem);
            
        }
        

        displayGrid.dataset.indexNumber = index;
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
        resetAddToDoForm,
    }

}

    

    


