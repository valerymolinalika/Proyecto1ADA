//import './styles.css'
import ReactDom from "react-dom/client";
import CreateRoot from "react-dom/client";
import App from "./App"

const root = ReactDom.createRoot(document.querySelector('#root'))

root.render(
    <div>
      <h1>
        Proyecto de Ada II
      </h1>
      <App/>
    </div>
)