import React, {useState} from 'react';
import { MetricTypes, Metric, MetricComponentProps } from './metrics'
import { Card } from 'react-bulma-components';
import { HashRates } from '../hash_rates'

import zxcvbn from 'zxcvbn';
import classNames from 'classnames';

function CardRenderer(props: MetricComponentProps) {
    // const [hover, setHover] = useState(false);
    // const [active, setActive] = useState(false);
    let cardClasses = classNames({
      "card": true,
      "active": props.active
    })

    return (
      <Card className={cardClasses} onClick={props.onSelect}>
        <Card.Content style={{
          display: "flex", flexDirection: "column"
        }}>
          <h2 style={{
            fontSize: "2rem", fontFamily: "Bebas Neue"
          }}> ZXCVBN </h2>
          <p> 
            ZXCVBN is an algorithm designed by Dropbox 
            that analyzes a password and gives it a rating
            based on how hard it is for hacking software to guess. 
          </p>
        </Card.Content>
      </Card>
    )
}

function DescriptionRenderer() {
  return (
    <p> ZXCVBN is an algorithm designed by Dropbox </p>
  )
}

const metric: Metric = {
  type: MetricTypes.zxcvbn,
  cardComponent: CardRenderer,
  descriptionComponent: DescriptionRenderer,

  calculator: (password: string, hashrate: HashRates) => {
    const result = zxcvbn(password);
    console.log("HASH_RATE", hashrate)

    if (hashrate === HashRates.hundred_per_hour) {
      return Number(result.crack_times_seconds.online_throttling_100_per_hour)
    } else if (hashrate === HashRates.ten_per_second) {
      return Number(result.crack_times_seconds.online_no_throttling_10_per_second)
    } else if (hashrate === HashRates.ten_thousand_per_second) {
      return Number(result.crack_times_seconds.offline_slow_hashing_1e4_per_second)
    } else if (hashrate === HashRates.ten_billion_per_second) {
      return Number(result.crack_times_seconds.offline_fast_hashing_1e10_per_second)
    }

    return 0
  }
}

export default metric