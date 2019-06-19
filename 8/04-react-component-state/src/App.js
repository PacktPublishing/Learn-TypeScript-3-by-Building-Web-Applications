import React from 'react';
import './App.css';
import {Calculator} from "./Calculator";

export function App() {
  return (
    <div className="App">
      <Calculator initialValue={42} />
    </div>
  );
}
