import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KtdGridLayout } from '@katoid/angular-grid-layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridLayoutService {

  constructor(private _http: HttpClient) { }

  /**
   * Fetches the layout configuration from a JSON file.
   * @returns An observable containing the layout configuration.
   */
  getLayoutConfig(): Observable<KtdGridLayout> {
    return this._http.get<KtdGridLayout>('assets/data.json');
  }
}
