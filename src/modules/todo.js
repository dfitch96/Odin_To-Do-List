
export class ToDo{
    

    constructor(id, title, description, dueDate, priority, notes){
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isComplete = false;
    }


    get toString(){
        return `To Do:\n${this.title}\n${this.description}\n${this.dueDate}\n${this.priority}\n${this.notes}\n${this.isComplete}\n`;
    }



}