interface Window {
  gtag?: (
    command: string,
    eventName: string,
    eventParams: {
      value: number;
      metric_id: string;
      metric_value: number;
      metric_delta: number;
      [key: string]: any;
    }
  ) => void;
}