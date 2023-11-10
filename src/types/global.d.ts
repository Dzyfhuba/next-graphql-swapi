import { SSRData } from "urql";

export declare global {
  interface Window {
    __URQL_DATA__?: SSRData
  }

  // add data-testid to all elements
  namespace JSX {
    interface IntrinsicAttributes {
      'data-testid'?: string;
    }
  }
}