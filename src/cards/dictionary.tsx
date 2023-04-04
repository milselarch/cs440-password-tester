import React, {useState} from 'react';
import { MetricTypes, Metric, MetricComponentProps } from './metrics'
import { Card } from 'react-bulma-components';

import classNames from 'classnames';
import { HashRates } from '../hash_rates'

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
          }}> Dictionary </h2>
          <p> 
            The more common the password is, the less protected it is
          </p>
        </Card.Content>
      </Card>
    )
}

function DescriptionRenderer() {
  return (
    <p style={{
      maxWidth: "60rem",
      minWidth: "40rem"
    }}>
      HaveIBeenPwned is a website that allows users to check whether their email addresses or passwords have been compromised in data breaches. The website maintains a database of over 11 billion compromised accounts, and users can enter their email address or password to see if it has been involved in any known data breaches.
      One common method used by hackers to obtain passwords is called a dictionary attack. In a dictionary attack, the attacker uses a list of commonly used passwords or words from a dictionary to try to guess the victim's password. This is why it is important to use strong, unique passwords that are not easily guessable.
    </p>
  )
}

const metric: Metric = {
  type: MetricTypes.dictionary,
  cardComponent: CardRenderer,
  descriptionComponent: DescriptionRenderer,
  calculator: (password: string, hashrate: HashRates) => {
    let HASH_RATE = 1;
    if (hashrate === HashRates.hundred_per_hour) {
      HASH_RATE = 100/3600
    } else if (hashrate === HashRates.ten_per_second) {
      HASH_RATE = 10
    } else if (hashrate === HashRates.ten_thousand_per_second) {
      HASH_RATE = 10000
    } else if (hashrate === HashRates.ten_billion_per_second) {
      HASH_RATE = 1e10
    }

    const hashesNeeded = 26 ** (password.length);
    const duration = hashesNeeded / HASH_RATE;
    return duration;
  }
}

export default metric