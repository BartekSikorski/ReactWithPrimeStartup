import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import './index.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export const Forecast = () =>  {
    const [count, setCount] = useState(0);
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
    }

    const showInfo = () => {
        toast.current.show({ severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000 });
    }

    const showWarn = () => {
        toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', life: 3000 });
    }

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
    }

    const showMultiple = () => {
        toast.current.show([
            { severity: 'info', summary: 'Message 1', detail: 'Message 1 Content', life: 3000 },
            { severity: 'info', summary: 'Message 2', detail: 'Message 2 Content', life: 3000 },
            { severity: 'info', summary: 'Message 3', detail: 'Message 3 Content', life: 3000 }
        ]);
    }


    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :
        <div>
            <div className="card">
                <DataTable value={forecasts} responsiveLayout="scroll">
                    <Column field="date" header="Date"></Column>
                    <Column field="temperatureC" header="Temp. (C)"></Column>
                    <Column field="temperatureF" header="Temp. (F)"></Column>
                    <Column field="summary" header="Summary"></Column>
                </DataTable>
            </div>
        </div>;



    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + PrimeReact</h1>
            <div>
                <h2>PrimeReact Typescript Issue Template</h2>
                <p>
                    Please create a test case and attach the link to the to your github
                    issue report.
                </p>
            </div>
            <div className="card">
                <Button
                    icon="pi pi-plus"
                    className="mr-2"
                    label="Increment"
                    onClick={() => setCount((count) => count + 1)}
                ></Button>
                <InputText value={count} />
                <p>
                    Edit <code>src/App.tsx</code> and save to test PrimeReact
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <div>
                <h1>Prognoza pogody</h1>
                {contents}
            </div>
            <div>
                <h1>Toast</h1>

                <Toast ref={toast}></Toast>

                <Button onClick={showSuccess} label="Success" className="p-button-success" />
                <Button onClick={showInfo} label="Info" className="p-button-info" />
                <Button onClick={showWarn} label="Warn" className="p-button-warning" />
                <Button onClick={showError} label="Error" className="p-button-danger" />
                <Button onClick={showMultiple} label="Multiple" />

            </div>

        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
}

//export default Forecast;
