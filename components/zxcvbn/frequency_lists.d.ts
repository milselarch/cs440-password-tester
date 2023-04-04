type FrequencyLists = {
    [key: string]: string[];
}

declare module 'frequency_lists' {
    const frequencyLists: FrequencyLists;
    export default frequencyLists;
  }