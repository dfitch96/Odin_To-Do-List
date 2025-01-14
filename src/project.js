import {ToDo} from "./todo.js";

export class Project{

    #toDoList;

    constructor(){
        this.#toDoList = [];
    }

    appendToDo(toDo){
        this.#toDoList.push(toDo);
    }

    getIndex(i){
        if(i < 0 || i > this.#toDoList.length){
            return null;
        }
        
        return this.#toDoList[i];
    }

    get toString(){
        let projectString = "";

        this.#toDoList.forEach((project) => {
            projectString += project.toString;
        })

        return projectString;
    }



}