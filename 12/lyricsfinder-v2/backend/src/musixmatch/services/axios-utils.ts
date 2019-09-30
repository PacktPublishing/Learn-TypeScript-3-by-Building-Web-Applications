import { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios';
import { defer, from, Observable } from 'rxjs';

/**
 * Utility method that takes the necessary configuration for an Axios GET request and returns
 * a deferred Observable, that will only execute the HTTP request when there is a subscriber.
 *
 * The data type can be forced if needed, but it is safer not to assume too much here and validate instead!
 *
 * @param requestURL the target URL
 * @param requestConfig the request configuration
 * @param axios the Axios instance to use
 */
export const observableAxiosGetRequest = <T = any>(
  requestURL: string,
  requestConfig: AxiosRequestConfig,
  axios: AxiosStatic,
): Observable<AxiosResponse<T>> => {
  // we defer the Promise creation using defer so that the request is
  // only sent when there is a subscriber
  return defer(
    (): Observable<AxiosResponse> => {
      return from(axios.get<T>(requestURL, requestConfig));
    },
  );
};
