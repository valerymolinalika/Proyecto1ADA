//import './styles.css'
//import './styles.css'
import ReactDom from "react-dom/client";
import CreateRoot from "react-dom/client";
import App from "./App"
import "./index.css"

//#1F4730
const root = ReactDom.createRoot(document.querySelector('#root'))

root.render(
  <div className="" style={{
    // backgroundColor: '#2596be',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    minWidth: '100vh'
  }}>
    <h1 style={{ fontSize: '36px', color: 'White', fontWeight: 'bold' }}>
      SUBASTA PÚBLICA DE ACCIONES
    </h1>
    <App />
  </div>
);