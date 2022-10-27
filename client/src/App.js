import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Home from './components/Home';
import NavBar from './components/Nav/Nav';
import Dogs from './components/Dogs/Dogs';
import DogDetails from './components/DogDetail/DogDetails';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/home" component={NavBar} />
      <Route exact path="/home" component={Dogs} />
      <Route path="/details/:id" component={DogDetails} />
    </div>
  );
}

export default App;
