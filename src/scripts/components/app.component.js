import './app.component.sass'

import React, {Component} from 'react'
import { ToastContainer } from 'react-toastify';

import MatchHistoryComponent from './match-history/match-history.component';

class App extends Component {
  render() {
    return <div className="stats-app">
      <MatchHistoryComponent></MatchHistoryComponent>
      <ToastContainer />
    </div>
  }
}

export default App;
