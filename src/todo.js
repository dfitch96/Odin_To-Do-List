
export class ToDo{
    #title;
    #description;
    #dueDate;
    #priority;
    #notes;
    #isComplete;

    constructor(title, description, dueDate, priority, notes){
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#notes = notes;
        this.#isComplete = false;
    }




    // GETTERS
    get title(){
        return this.#title;
    }

    get description(){
        return this.#description;
    }

    get dueDate(){
        return this.#dueDate;
    }

    get priority(){
        return this.#priority;
    }

    get notes(){
        return this.#notes;
    }

    get isComplete(){
        return this.#isComplete;
    }

    get toString(){
        return `To Do:\n${this.#title}\n${this.#description}\n${this.#dueDate}\n${this.#priority}\n${this.#notes}\n${this.#isComplete}\n`;
    }


    // SETTERS
    set title(newTitle){
        this.#title = newTitle;
    }

    set description(newDescription){
        this.#description = newDescription;
    }

    set dueDate(newDueDate){
        this.#dueDate = newDueDate;
    }

    set priority(newPriority){
        this.#priority = newPriority;
    }

    set notes(newNotes){
        this.#notes = newNotes;
    }

    set isComplete(newIsComplete){
        this.#isComplete = newIsComplete;
    }


    


}