import enableDocumentValidating from './modules/validate.js';
import addEventListeners from './modules/handlers.js';
import refreshCards from './modules/data.js';

refreshCards();
enableDocumentValidating();
addEventListeners();
