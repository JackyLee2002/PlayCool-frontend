import './App.css';
import ParkingLotTable from "./components/ParkingLotTable";
import {ParkingLotProvider} from "./ParkingLotContext";


function App() {
    return (
        <ParkingLotProvider>
            <div className="App">
                <ParkingLotTable />
            </div>
        </ParkingLotProvider>
    );
}

export default App;
