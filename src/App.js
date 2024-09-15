import CustomerCity from "./pages/CustomerCity";
import CustomerDetail from "./pages/CustomerDetail";
import CustomerListing from "./pages/CustomerListing";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<CustomerListing />} />
          <Route path='/detail/:id' element={<CustomerDetail />} />
          <Route path='/city' element={<CustomerCity />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
