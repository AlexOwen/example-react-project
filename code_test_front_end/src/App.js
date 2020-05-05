import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import FormPage from './components/form.js';
import AnswersPage from './components/answers.js'
import './App.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/answers">
          <AnswersPage />
        </Route>
        <Route path="/">
          <FormPage />
        </Route>
      </Switch>
    </Router>
  );

}

export default App;
