import React from "react";
import GridInterpreter from "./components/GridInterpreter";
import "./App.css";

const App = (): JSX.Element => {
    return (
        <div className="App">
            <header className="App-header">
                <GridInterpreter />
            </header>
        </div>
    );
};

export default App;
