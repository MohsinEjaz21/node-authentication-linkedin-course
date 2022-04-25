import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { App } from './App';
import './index.css';
import { reduxStore } from './redux/store';


const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </StrictMode>
);


