import Forms from './Form';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login';
import DataTable from './DataTable';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="/sdsdjhbbsddhjbsfdh" element={<Login />} />
          <Route path="/data" element={<DataTable />} />
          <Route path="*" element={<Forms />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
