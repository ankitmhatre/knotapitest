// App.js
import React from 'react';

import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllContacts from './pages/AllContacts';
import CreateContact from './pages/CreateContact';
import EditContact from './pages/EditContact';
import ViewContact from './pages/ViewContact';





const router = createBrowserRouter([

  {
    path: "/",
    element: <AllContacts />,

  },
  {
    path: "/create",
    element: <CreateContact />,
  },
  {
    path: "/edit/:id",
    element: <EditContact />,
  },

  {
    path: "/contact/:id",
    element: <ViewContact />,
  },

  

  

  
]);

const App = () => {
  return (
    <React.StrictMode>
     <div className="App">
     <RouterProvider router={router} />
  </div>

   
  </React.StrictMode>

   
  );
};

export default App;
