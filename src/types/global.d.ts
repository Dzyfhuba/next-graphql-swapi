import { SSRData } from "urql";

export declare global {
  interface Window {
    __URQL_DATA__?: SSRData
  }
}