import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import './App.css';

class App extends PureComponent {
  state = { isLoaded: true };

  render() {
    const { isLoaded } = this.state;
    return (
      isLoaded && (
        <Router>
          <div className="container">
            <div className="app__header">
              <h1 className="app__header-title">Привет, ты VGorode!</h1>
            </div>
          </div>
          <div className="container">
            <Main />
          </div>
        </Router>
      )
    );
  }
}

export default App;
