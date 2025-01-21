import {ToDo} from "./todo.js";

export const PROJECT_KEYS = "projectKeys";

if(!window["localStorage"].getItem(PROJECT_KEYS)){
    window["localStorage"].setItem(PROJECT_KEYS, JSON.stringify([]));
}


export class Project{

    #storage;

    constructor(name){
        this.toDoList = [];
        this.name = name;
        this.#storage = window["localStorage"];
        this.#addProjectToLocalStorage();
        this.#addKeyToStorage(name);
    }

    #addKeyToStorage(key){

        const keyStorageObj = JSON.parse(this.#storage.getItem(PROJECT_KEYS));
        if (!keyStorageObj.includes(key)){
            keyStorageObj.push(key);
        
            this.#storage.setItem(PROJECT_KEYS, JSON.stringify(keyStorageObj));
        }
        
    
        
    }   

    #addProjectToLocalStorage(){

        if(!this.#storage.getItem(this.name) && Project.storageAvailable()){
            this.#storage.setItem(this.name, JSON.stringify(this));
        }
    }

    

    #updateStorage(){
        if(Project.storageAvailable()){
            this.#storage.setItem(this.name, JSON.stringify(this));
        }
        
    }

    addToDo(title, description, dueDate, priority){
        const id = this.toDoList.length > 0 ? this.toDoList[this.toDoList.length - 1].id + 1 : 1;
        const newTask = new ToDo(id, title, description, dueDate, priority);
        this.toDoList.push(newTask);
        this.#updateStorage();

    }

    deleteToDo(id){
        this.toDoList = this.toDoList.filter((todo) => todo.id !== id);
        this.#updateStorage();
    }

    editToDo(id, updatedProperties){

        const todo = this.getToDo(id);

        todo.title = updatedProperties.title;
        todo.description = updatedProperties.description;
        todo.dueDate = updatedProperties.dueDate;
        todo.priority = updatedProperties.priority;

        this.#updateStorage();

    }

    getToDo(id){
        return this.toDoList.find(todo => todo.id === id);
    }

    toggleIsComplete(id){
        const task = this.toDoList.find(todo => todo.id === id);
        task.isComplete = !task.isComplete;
        this.#updateStorage();
    }

    getIsComplete(id){
        const task = this.toDoList.find(todo => todo.id === id);
        return task.isComplete;
    }

    static storageAvailable(){
            let storage;
            try{
                storage = window["localStorage"];
                const x = "__storage_test__";
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            } catch(e) {
                return (
                    e instanceof DOMException &&
                    e.name === "QuotaExceededError" &&
                    storage &&
                    storage.length !== 0
                );
            }
        }

    get toString(){
        let projectString = `${this.name}\n\n`;

        this.toDoList.forEach((project) => {
            projectString += project.toString;
        })

        return projectString;
    }



}