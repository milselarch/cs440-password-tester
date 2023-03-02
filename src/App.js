import { useState } from "react"
import PasswordMeterCustom from "./components/PasswordMeterCustom"
import PasswordMeter from "./components/PasswordMeter"
import Zxcvbn from "./components/zxcvbn"
import Card from "@mui/material/Card"
import Haveibeenpwned from "./components/Haveibeenpwned"

function App() {
  const [password, setPassword] = useState("")

  return (
    <div className='container-fluid'>
      <div className='col-md-6 mx-auto text-right'>
        <h2 className='text-center my-3'>Password Strength Meter</h2>
        <h5 className='text-center my-3'>
          CS440 - Foundations of Cybersecurity
        </h5>
        <h5 className='text-center my-3'>AY2022/2023, Sem 2, G3 Team 5</h5>

        <div class='d-flex justify-content-center'>
          <input
            type='text'
            className='form-control shadow-none w-25'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='row'>
          <div className='col-sm'>
            <div className='form-group mb-1'></div>
          </div>
        </div>
      </div>

      <div className='col-sm'>
        <Card variant='outlined' style={{ marginTop: 32 }}>
          <Haveibeenpwned password={password} />
        </Card>
      </div>
      <div className='row'>
        <div className='col-sm'>
          <Card variant='outlined' style={{ marginTop: 32 }}>
            <PasswordMeterCustom password={password} />
          </Card>
        </div>
        <div className='col-sm'>
          <Card variant='outlined' style={{ marginTop: 32 }}>
            <PasswordMeter password={password} />
          </Card>
        </div>
        <div className='col-sm'>
          <Card variant='outlined' style={{ marginTop: 32 }}>
            <Zxcvbn password={password} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App
