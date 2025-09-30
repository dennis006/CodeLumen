import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void
  }
}

const root = document.getElementById("root")

if (!root) throw new Error("Root element not found")

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
