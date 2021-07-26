import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DataProvider} from "./Contecst/DataContecst";
import SimpleReactLightbox from 'simple-react-lightbox'

ReactDOM.render(
    <React.StrictMode>
        <DataProvider>
            <SimpleReactLightbox>
                <App/>
            </SimpleReactLightbox>
        </DataProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

