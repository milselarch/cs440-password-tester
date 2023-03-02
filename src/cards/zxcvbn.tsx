import React, {useState} from 'react';
import { MetricTypes, Metric, MetricComponentProps } from './metrics'
import { Card } from 'react-bulma-components';

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
  calculator: (password: string) => {
    const result = zxcvbn(password);
    return Number(
      result.crack_times_seconds.offline_slow_hashing_1e4_per_second
    )
  }
}

export default metric