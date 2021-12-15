import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  RawDays,
  RawDay,
  Day,
  swedishBooleanToBoolean,
} from 'src/app/days/days.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DaysService {
  apiURL = 'https://sholiday.faboul.se/dagar/v2.1/';

  constructor(private http: HttpClient) {}

  getDays(): Observable<Day[]> {
    return this.http
      .get<RawDays>(`${this.apiURL}${new Date().getFullYear()}`)
      .pipe(map(value => value.dagar.map(day => this.createDay(day))));
  }

  private createDay(rawDay: RawDay): Day {
    return {
      date: new Date(rawDay.datum),
      weekday: rawDay.veckodag,
      week: parseInt(rawDay.vecka, 10),
      dayOfWeek: parseInt(rawDay['dag i vecka'], 10),
      nonWorkingDay: swedishBooleanToBoolean(rawDay['arbetsfri dag']),
      redDay: swedishBooleanToBoolean(rawDay['röd dag']),
      nameDay: rawDay.namnsdag,
      flagDay: rawDay.flaggdag !== '' ? rawDay.flaggdag : undefined,
      holiday: rawDay.helgdag,
      halfDay: swedishBooleanToBoolean(rawDay['dag före arbetsfri helgdag'])
        ? rawDay.helgdagsafton
        : undefined,
    };
  }
}
