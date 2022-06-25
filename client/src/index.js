import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './App.css';
import './client.css';
import './index.css';
import './carosel.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
