import './App.css';
import Read from './components/read';
import ReadClientes from './components/readClientes';
import ReadProyectos from './components/readProyectos';
import ReadInventario from './components/readInventario';
import Update from './components/update';
import Create from './components/create'; // Cambiado el nombre del componente de "create" a "Create"
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className='main'>
        <h2>Trabajo de Manejo de API</h2>
        <div>
          <Route exact path='/create' component={Create}></Route> {/* Ruta corregida */}
        </div>
        <div style={{ marginTop: 20 }}>
          <Route exact path='/read' component={Read}></Route>
          <Route exact path='/readClientes' component={ReadClientes}></Route>
          <Route exact path='/readProyectos' component={ReadProyectos} ></Route>
          <Route exact path='/readInventario' component={ReadInventario} ></Route>
          <Route exact path='/update' component={Update}></Route>
        </div>
      </div>
    </Router>
  );
}
