import React from 'react';
import './App.css';
import {LifecycleAwareComponent} from "./LifecycleAwareComponent";

function App() {
  return (
    <div className="App">
      <LifecycleAwareComponent initialValue={42} />
    </div>
  );
}

export default App;
