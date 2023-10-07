import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AddBook from './component/AddBook/AddBook';
import GetBook from './component/GetBook/GetBook.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/addbook' element={<AddBook/>} />
        <Route path='/getbook' element={<GetBook/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;