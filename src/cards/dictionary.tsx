import React, {useState} from 'react';
import { MetricTypes, Metric, MetricComponentProps } from './metrics'
import { Card } from 'react-bulma-components';

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
          }}> Dictionary </h2>
          <p> 
            The more common the password is, the less protected it is
          </p>
        </Card.Content>
      </Card>
    )
}

const HASH_RATE = 100e6; // assume 100M hash/s hash rate

function DescriptionRenderer() {
  return (
    <p> The more common the password, the easier the guess of the password</p>
  )
}

const metric: Metric = {
  type: MetricTypes.dictionary,
  cardComponent: CardRenderer,
  descriptionComponent: DescriptionRenderer,
  calculator: (password: string) => {
    const hashesNeeded = 26 ** (password.length);
    const duration = hashesNeeded / HASH_RATE;
    return duration;
  }
}

export default metric