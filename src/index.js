import './styles.css';
import { greet } from './modules/greet.js';
import { capitalize } from './modules/utils.js';


const name = 'user';
const message = greet(capitalize(name));
document.getElementById('app').textContent = message;