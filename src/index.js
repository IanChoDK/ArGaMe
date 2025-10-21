import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "react-toastify/dist/ReactToastify.css"
import "./styles/global.css";

import { ToastContainer } from "react-toastify"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000}/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)