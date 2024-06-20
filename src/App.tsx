
import { Link } from 'react-router-dom';
import './App.css'
import { Navbar } from './components/navbar/Navbar'

function App() {

  return (
    <div className="app-main">
      <Navbar />
      <div className="content-app">
        <Link to='/game' className='app-button'> JUGAR</Link>
      </div>
    </div>
  );
};

export default App
