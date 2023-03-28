import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <h1>React UI Practice</h1>
      <ul>
        <li>
          <Link to="/react-playground/layout">Layout</Link>
        </li>
      </ul>
    </div>
  )
}

export default App