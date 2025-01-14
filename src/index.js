import "./styles.css";
import {Project} from "./project.js";
import {ToDo} from "./todo.js";


let project = new Project();

const firstToDo = new ToDo("Physics Homework", "Kinematics", "1-15-2025", "high", "chapter 1");
const secondToDo = new ToDo("Math Homework", "Calculus", "1-15-2025", "high", "chapter 2");
project.appendToDo(firstToDo);
project.appendToDo(secondToDo);

console.log(project.toString);
