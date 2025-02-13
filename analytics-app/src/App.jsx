import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chart from './components/Chart'
import LogAccessForm from './components/LogAccessForm'

function App() {
  const [chartData, setChartData] = useState([]);

  return (
    <div>
      <h1>Analytics App Dashboard</h1>
      <LogAccessForm setChartData={setChartData} />
      <Chart data={chartData} />
    </div>
  )
}

export default App
