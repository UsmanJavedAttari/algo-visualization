import { AnyObject } from '@/globals';

export class ExportCSV {
  private static _Instance: ExportCSV;
  public static get Instance() {
    if (!ExportCSV._Instance) {
      ExportCSV._Instance = new ExportCSV();
    }
    return ExportCSV._Instance;
  }
  private constructor() {}

  public export(obj: AnyObject) {
    const json = JSON.stringify(obj);
    fetch('https://json-csv.com/api/getcsv', {
      // mode: 'no-cors',
      method: 'POST',
      body: new URLSearchParams({
        email: 'usman.attari002@gmail.com',
        json
      }),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(({ json }) => {
        return json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
