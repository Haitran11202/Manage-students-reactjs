import "./App.css";
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import InsertStudent from "./components/InsertStudent";
import Table from "./components/Table";
import { AppProvider } from "./Context";
function App() {
    return (
        <Router>
            <AppProvider>
                <div className="App">
                    <Header />
                    <div className="app-wrapper">
                        <Routes>
                            <Route path="/" element={<Table />} />
                            <Route path="/:search" element={<Table />} />
                            <Route
                                path="/insert/:id"
                                element={<InsertStudent />}
                            />
                            <Route
                                path="/insert/"
                                element={<InsertStudent />}
                            />
                        </Routes>
                    </div>
                </div>
            </AppProvider>
        </Router>
    );
}

export default App;
