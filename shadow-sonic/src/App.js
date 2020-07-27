import React from 'react';
import logo from './logo.svg';
import MusicList from '@/pages/music/MusicList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path={['/']} component={MusicList}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
