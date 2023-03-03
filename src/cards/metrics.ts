enum MetricTypes {
    zxcvbn,
    entropy,
    dictionary
}

interface MetricComponentProps {
    active: boolean,
    onSelect: () => void
}

type Metric = {
    type: MetricTypes,
    cardComponent: (props: MetricComponentProps) => React.ReactNode,
    descriptionComponent: () => React.ReactNode,
    calculator: (password: string) => number,
}

export {type Metric, MetricTypes, type MetricComponentProps}