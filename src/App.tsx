import './App.scss'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import 'bulma/css/bulma.min.css';
import { MetricTypes, Metric, MetricComponentProps} from './cards/metrics'
import { Form, Card } from 'react-bulma-components';
import { Haveibeenpwned } from '../components/Haveibeenpwned'
import { PasswordMeter} from '../components/PasswordMeter'
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter'
import { Zxcvbn } from '../components/Zxcvbn'
import { HashRates } from './hash_rates'

import ZbcvbnMetric from './cards/zxcvbn';
import LengthMetric from './cards/length';
import DictionaryMetric from './cards/dictionary';
import metric from './cards/zxcvbn';

// const HASH_RATE = 100e6; // assume 100M hash/s hash rate
const Field = Form.Field
const RadioButton = Form.Radio

function formatDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60)
  return `${hours}hr ${minutes}m ${seconds}s`;
}

const metricsList: Metric[] = [ZbcvbnMetric, LengthMetric, DictionaryMetric]
const defaultMetric = ZbcvbnMetric

function App() {
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');
  const [algo, setAlgo] = useState('');
  const [hashRate, setHashRate] = useState(HashRates.hundred_per_hour);
  const [activeMetric, setActiveMetric] = useState<Metric>(
    defaultMetric
  )

  function renderMetricCard() {
    if (activeMetric === ZbcvbnMetric) {
      return (
        <Card style={{ marginTop: 32 }}>
          <PasswordStrengthMeter password = { password} />
          <Zxcvbn password={password} />
        </Card>
      );
    } else if (activeMetric === DictionaryMetric) {
      return (
        <Card style={{ marginTop: 32 }}>
          <Haveibeenpwned password={password} />
        </Card>
      );
    } else if (activeMetric === LengthMetric){
      return(
        <Card style={{ marginTop: 32 }}>
        <PasswordMeter password={password} />
      </Card>
      );
   }
  }

  const loadPasswordDuration = (
    password: string, activeMetric: MetricTypes
  ) => {
    let duration = 0;
    // find the currently selected metric and 
    // get the duration needed to crack the password
    // according to the currently selected metric 
    for (let metric of metricsList) {
      if (metric.type.valueOf() == activeMetric.valueOf()) {
        duration = metric.calculator(password, hashRate)
        break
      }
    }

    let formattedDuration = formatDuration(duration)
    setComment(`Cracking this password takes ${formattedDuration}`)
  }

  const updateHashRate = (newHashRate: HashRates) => {
    setHashRate(newHashRate)
    let duration = -1;
    // console.log('MM', metric, metricsList)

    for (let metric of metricsList) {
      // console.log('MM', metric.valueOf(), activeMetric.valueOf())
      if (metric.type == activeMetric.type) {
        duration = metric.calculator(password, newHashRate)
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

        <Field id="hash-rate-selector">
          <RadioButton
            className='button is-outlined'
            checked={hashRate === HashRates.hundred_per_hour}
            onChange={() => updateHashRate(HashRates.hundred_per_hour)}
            color="danger"
            textColor="light"
          >
            100 / hr
          </RadioButton>

          <RadioButton
            className='button is-outlined'
            checked={hashRate === HashRates.ten_per_second}
            onChange={() => updateHashRate(HashRates.ten_per_second)}
            color="success"
            textColor="light"
          >
            10 / s
          </RadioButton>

          <RadioButton
            className='button is-outlined'
            checked={hashRate === HashRates.ten_thousand_per_second}
            onChange={() => updateHashRate(HashRates.ten_thousand_per_second)}
            color="primary"
            textColor="light"
          >
            1000 / s
          </RadioButton>

          <RadioButton
            className='button is-outlined'
            checked={hashRate === HashRates.ten_billion_per_second}
            onChange={() => updateHashRate(HashRates.ten_billion_per_second)}
            color="primary"
            textColor="light"
          >
            1e10 / s
          </RadioButton>
        </Field>

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
        {DictionaryMetric.cardComponent({ 
          'active': activeMetric.type == DictionaryMetric.type,
          onSelect: () => { onMetricUpdate(DictionaryMetric) } 
        })}
      </div>
        {/* <div className='col-sm'>
        <Card style={{ marginTop: 32 }}>
          <Haveibeenpwned password={password} />
        </Card>
        <div className='col-sm'>
          <Card  style={{ marginTop: 32 }}>
            <PasswordMeter password={password} />
          </Card>
        </div>
      </div> */}
      <div className='col-sm'>
        {renderMetricCard()}
      </div>
      <div style={{margin: "2rem"}}>
        {activeMetric.descriptionComponent()}
      </div>
      
    </div>
  )
}

export default App
