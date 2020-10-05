import { AnyObject, delay } from '@/globals';
import Axios from 'axios';
import { LoaderService } from './loader.service';

export class ExportCSV {
  private static _Instance: ExportCSV;
  public static get Instance() {
    if (!ExportCSV._Instance) {
      ExportCSV._Instance = new ExportCSV();
    }
    return ExportCSV._Instance;
  }
  private constructor() {}

  private LoaderService = LoaderService.Instance;

  public async export(obj: AnyObject) {
    this.LoaderService.showFullScreenLoader();
    Axios.request({
      url:
        'https://cors-anywhere.herokuapp.com/https://json-csv.com/api/getcsv',
      data: new URLSearchParams({
        email: 'usman.attari002@gmail.com',
        json: JSON.stringify(obj)
      }).toString(),
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .then(({ data }) => {
        const link = document.createElement('a');
        link.setAttribute(
          'href',
          'data:text/csv;charset=utf-8,' + encodeURI(data)
        );
        link.setAttribute('download', 'algo-visualizations.xlsx');
        document.body.appendChild(link);
        link.click();
        // document.body.removeChild(link);
        this.LoaderService.hideFullScreenLoader();
      })
      .catch(e => {
        this.LoaderService.hideFullScreenLoader();
        alert('Something went wrong! Please try again later.');
        console.log(e);
      });
    await delay(3000);
  }
}
