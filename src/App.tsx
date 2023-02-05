import { useState } from 'react'
import reactLogo from './assets/react.svg'
import 'bulma/css/bulma.min.css';
import { Form } from 'react-bulma-components';
import moment from 'moment'
import './App.css'

const HASH_RATE = 100e6; // assume 100M hash/s hash rate

function formatDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60)
  return `${hours}hr ${minutes}m ${seconds}s`;
}

function App() {
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');

  const onPasswordUpdate = (
    update: React.SetStateAction<string>
  ) => {
    let value = update.toString();
    let hashesNeeded = 26 ** (value.length);
    let duration = hashesNeeded / HASH_RATE;

    let formattedDuration = formatDuration(duration)
    setComment(`Cracking this password takes ${formattedDuration}`)
    setPassword(update)
  }

  return (
    <div className="App">
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
  )
}

export default App
