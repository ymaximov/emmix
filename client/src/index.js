import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {store} from './redux/store'
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("CompanyName=Emmix Corp.,LicensedApplication=Emmix,LicenseType=SingleApplication,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-035738,SupportServicesEnd=12_December_2023_[v2]_MTcwMjMzOTIwMDAwMA==feb333ead131f43efec2dce6dc316b3a")


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
