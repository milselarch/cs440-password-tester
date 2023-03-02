import './App.scss'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import 'bulma/css/bulma.min.css';
import { MetricTypes, Metric, MetricComponentProps} from './cards/metrics'
import { Form, Card } from 'react-bulma-components';

import ZbcvbnMetric from './cards/zxcvbn';
import LengthMetric from './cards/length'

// const HASH_RATE = 100e6; // assume 100M hash/s hash rate

function formatDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60)
  return `${hours}hr ${minutes}m ${seconds}s`;
}

const metricsList: Metric[] = [ZbcvbnMetric, LengthMetric]
const defaultMetric = ZbcvbnMetric

function App() {
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');
  const [activeMetric, setActiveMetric] = useState<Metric>(
    defaultMetric
  )

  const loadPasswordDuration = (
    password: string, activeMetric: MetricTypes
  ) => {
    let duration = 0;
    // find the currently selected metric and 
    // get the duration needed to crack the password
    // according to the currently selected metric 
    for (let metric of metricsList) {
      if (metric.type.valueOf() == activeMetric.valueOf()) {
        duration = metric.calculator(password)
        break
      }
    }

    let formattedDuration = formatDuration(duration)
    setComment(`Cracking this password takes ${formattedDuration}`)
  }

  // updates the time taken to crack password
  // whenever the password field contents change
  const onPasswordUpdate = (
    update: React.SetStateAction<string>
  ) => {
    setPassword(update)
    const newPassword = update.toString()
    loadPasswordDuration(newPassword, activeMetric.type)
  }

  const onMetricUpdate = (newMetric: Metric) => {
    setActiveMetric(newMetric);
    loadPasswordDuration(password, newMetric.type);
  }

  return (
    <div className="App" style={{
      display: "flex", flexDirection: "column",
      alignItems: "center"
    }}>
      <div 
        id="password-holder" style={{
          maxWidth: "60rem", marginBottom: "2rem"
        }}
      >
        <h1 style={{
          "marginBottom": "1rem",
          "fontSize": "2rem"
        }}>Password Strength Tester</h1>

        <Form.Field>
          <Form.Input 
            className="is-dark"
            placeholder="Password" name="password" 
            type="text" value={password} 
            onChange={e => onPasswordUpdate(e.target.value)}
            style={{
              "minWidth": "60vh"
            }}
          />
        </Form.Field>

        <p>{comment}</p>
      </div>

      <div className="cards-holder">
        {ZbcvbnMetric.cardComponent({ 
          'active': activeMetric.type == ZbcvbnMetric.type,
          onSelect: () => { onMetricUpdate(ZbcvbnMetric) } 
        })}
        {LengthMetric.cardComponent({ 
          'active': activeMetric.type == LengthMetric.type,
          onSelect: () => { onMetricUpdate(LengthMetric) } 
        })}
      </div>

      <div style={{margin: "2rem"}}>
        {activeMetric.descriptionComponent()}
      </div>
    </div>
  )
}

export default App
