import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { store } from 'redux/store';

import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter(routes);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
