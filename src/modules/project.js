import {ToDo} from "./todo.js";

export class Project{

    constructor(name){
        this.toDoList = [];
        this.name = name;
    }

    addToDo(title, description, dueDate, priority){
        const id = this.toDoList.length > 0 ? this.toDoList[this.toDoList.length - 1].id + 1 : 1;
        this.toDoList.push(new ToDo(id, title, description, dueDate, priority));
    }

    deleteToDo(id){
        this.toDoList = this.toDoList.filter((todo) => todo.id !== id);
    }


    getToDoo(id){
        return this.toDoList.find(todo => todo.id === id);
    }

    get toString(){
        let projectString = `${this.name}\n\n`;

        this.toDoList.forEach((project) => {
            projectString += project.toString;
        })

        return projectString;
    }



}