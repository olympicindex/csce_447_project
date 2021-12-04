import React from "react";
import './App.css';
import {Navbar} from "./Navbar.js";
import BubbleChart from "./BubbleChart";
import Ologo from "./Ologo";
import { BBC } from "./BBC";

function App() {
  return (
    <div className="App">
      <h1>hello bitch </h1>
      {/* <BubbleChart/> */}
      <BBC/>
      <Navbar/>
      <Ologo/>
    </div>
  );
}

export default App;
