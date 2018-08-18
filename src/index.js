'use strict';

import './styles/index.sass'
import 'react-toastify/dist/ReactToastify.css';

import './scripts/fontawesome';

import React from 'react';
import { render } from 'react-dom';

import App from './scripts/components/app.component';

render(<App />, document.querySelector('#app'));
