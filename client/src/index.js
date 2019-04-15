import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from "drizzle";
import Trade from "./contracts/Trade.json";

// let drizzle know what contracts we want
const options = { contracts: [Trade] };

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));

serviceWorker.register();
