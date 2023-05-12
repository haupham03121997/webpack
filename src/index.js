import "./styles/style.css";
import "./styles/styles.scss";
import { sum } from "./utils";

console.log(sum(1,40));

// ES6: Spread Operator
const person =  { name : "Hau"};
const personClone = {...person};
console.log("personClone",personClone);

// ES7: Object.values
console.log("Object.values",Object.values(person));