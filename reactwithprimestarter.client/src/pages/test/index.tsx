import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

interface Product {
    date: string;
    Id: number;
    Name: string;
}

export const Products = () => {
    const [products, setproducts] = useState<Product[]>();

    useEffect(() => {
        populateValues();
    }, []);

    const contents = products === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :
        <div>
            <div className="card">
                <DataTable value={products} responsiveLayout="scroll">
                    <Column field="date" header="Data"></Column>
                    <Column field="Name" header="Nazwa"></Column>
                    <Column field="Id" header="Id"></Column>
                </DataTable>
            </div>
        </div>;



    return (
        <div className="App">
            {contents}
        </div>
    );

    async function populateValues() {
        const response = await fetch('values');
        const data = await response.json();
        setproducts(data);
    }
}

//export default Forecast;
