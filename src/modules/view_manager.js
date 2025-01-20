

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

    const closeAddProjectDialog = function(returnValue){
        addProjectDialog.close(returnValue);
    }

    const resetAddProjectForm = function(){
        const form = addProjectDialog.querySelector(".form-container");
        form.reset();
    }

    const displayProjectsOnSidebar = function(projects){

        removeProjectsFromSidebar();
        const projectsNav = createElementWithId("nav", "projects-nav");
        const projectsList = createElementWithId("ul", "projects-list");

        for(let i = 0; i < projects.length; i++){

            const projectListItem = createElementWithClass("li", "project");
            const projectButton = createElementWithClass("button", "project-button");
            projectButton.dataset.indexNumber = i;
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



    const bindProjectsOnClick = function(handler){

        const projectsList = sideBarDetails.querySelector("#projects-list");

        if(projectsList){
            for(const child of projectsList.children){
                const projectButton = child.querySelector(".project-button")
                projectButton.addEventListener("click", handler);
            }
        }

    }   



    // MAIN DISPLAY FUNCTIONS

    const showAddToDoDialog = function(){
        const header = addToDoDialog.querySelector("h4");
        header.textContent = "Add To Do";
        addToDoDialog.showModal();
    }

    const showEditToDoDialog = function(id, todo){

        const form = addToDoDialog.querySelector(".form-container");
        const header = addToDoDialog.querySelector("h4");
        
        header.textContent = "Edit To Do";
        form.querySelector("#title").value = todo.title;
        form.querySelector("#description").value = todo.description;
        form.querySelector("#duedate").value = todo.dueDate;
        form.querySelector("#priority").value = todo.priority;
        form.dataset.id = id;

        addToDoDialog.showModal();
    }

    const closeAddToDoDialog = function(returnValue){
        const form = addToDoDialog.querySelector(".form-container");
       
        addToDoDialog.close(returnValue);
    }

    const resetAddToDoForm = function(){
        const form = addToDoDialog.querySelector(".form-container");
        form.setAttribute("data-id", '');
        form.reset();
    }

    const bindAddToDoButtonOnClick = function(handler){

        const addTaskButton = display.querySelector(".add-todo-button");
        addTaskButton.addEventListener("click", handler);
        
    }


    const bindEditButtonOnClick = function(handler){
        const displayGrid = getElement("#display-grid");

        if(displayGrid){
            for(const child of displayGrid.children){
                const button = child.querySelector(".edit-button");
                button.addEventListener("click", handler);
            }
        }
    }

    const bindDeleteButtonOnClick = function(handler){

        const displayGrid = getElement("#display-grid");

        if(displayGrid){
            for(const child of displayGrid.children){
                const button = child.querySelector(".delete-button");
                button.addEventListener("click", handler);
            }
        }

    }

    const bindStatusCheckboxOnClick = function(handler){

        const displayGrid = getElement("#display-grid");

        if(displayGrid){
            for(const child of displayGrid.children){
                const checkbox = child.querySelector(".status-checkbox");
                checkbox.addEventListener("click", handler);
            }
        }

    }


    function createToDoElements(todo){
        
        const header = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");


        header.textContent = !todo.isComplete ? `${todo.title}` : `${todo.title} (Completed)`;
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


    function updateDisplayItemHeader(id){
        
    }


    function setButton(button, text, index, id, value, className){
        button.textContent = text;
        button.classList.add(className);
        button.dataset.indexNumber = index;
        button.dataset.id = id;
        button.value = value
    }

    function createButtonGroup(indexNumber, id, isComplete){
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
        checkbox.checked = isComplete;
        
        checkboxDiv.appendChild(checkbox);

        buttonGroup.appendChild(checkboxDiv);

        // SET/APPEND EDIT AND DELETE BUTTON
        const divContainer = document.createElement("div");
        setButton(editButton, "Edit", indexNumber, id, "edit", "edit-button");
        setButton(deleteButton, "Delete", indexNumber, id, "delete", "delete-button");
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

    const displayToDos = function(project, index){

        const projectHeader = document.createElement("h2");
        const addToDoButton = document.createElement("button");
        const displayGrid = createElementWithId('div', 'display-grid');
        const headerContainer = createElementWithId("header", "header-container");

        // append header and add to do button to display
        projectHeader.textContent = `${project.name}`;
        headerContainer.appendChild(projectHeader);
        addToDoButton.textContent = 'Add To Do';
        addToDoButton.classList.add("add-todo-button");
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
            displayItem.dataset.id = project.toDoList[i].id;
            
            const elmnts = createToDoElements(project.toDoList[i]);
            const buttonGroup = createButtonGroup(index, project.toDoList[i].id, project.toDoList[i].isComplete);

            appendElements(elmnts, displayItem);
            displayItem.appendChild(buttonGroup);
            displayGrid.appendChild(displayItem);
            
        }
        

        displayGrid.dataset.indexNumber = index;
        display.appendChild(displayGrid);


    }


    
   

    return {
        
        createElementWithClass,
        createElementWithId,
        getElement,
        displayProjectsOnSidebar,
        showAddProjectDialog,
        resetAddProjectForm,
        displayToDos,
        resetDisplay,
        resetAddToDoForm,
        bindProjectsOnClick,
        bindAddToDoButtonOnClick,
        bindDeleteButtonOnClick,
        bindEditButtonOnClick,
        bindStatusCheckboxOnClick,
        showAddToDoDialog,
        showEditToDoDialog,
        closeAddToDoDialog,
        closeAddProjectDialog,

    }

}

    

    


