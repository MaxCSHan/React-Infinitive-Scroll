import initializeAxios from "../setup/axioSetup";
import { axiosRequestConfiguration } from "../setup/axiosRequestConfig";
import { map, take, retryWhen, tap, delay } from "rxjs/operators";
import { defer, Observable, } from "rxjs";

const axiosInstance = initializeAxios(axiosRequestConfiguration);

const axiosGet = <T>(url: string, queryParams?: object): Observable<T> => {
  return defer(() => axiosInstance.get<T>(url, { params: queryParams })).pipe(
    map((result) => result.data)
  );
};


//

const get = <T>(url: string, queryParams?: object): Observable<T[]> => {
  return axiosGet<T[]>(url,queryParams).pipe(
    take(1),
    retryWhen((err) =>
      err.pipe(
        tap((val) => console.log(`Get Error ${val} and retrying...`)),
        delay(3000),
        take(5)
      )
    )
  ) as Observable<T[]>;
};


export { get };
