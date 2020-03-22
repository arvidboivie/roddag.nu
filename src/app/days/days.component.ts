import { Component, OnInit } from '@angular/core';
import { DaysService } from 'src/app/days/days.service';
import { Day } from 'src/app/days/days.interface';
import { isAfter, differenceInCalendarDays, isSameDay } from 'date-fns';

@Component({
  selector: 'app-days',
  template: `
    <div class="container" *ngIf="hasLoaded">
      <div class="big-text" *ngIf="!holidayToday">
        {{ holidayDistance }} dag<span *ngIf="holidayDistance > 1">ar</span>
      </div>
      <div class="big-text" *ngIf="holidayToday">Idag</div>
      <div class="small-text" *ngIf="!holidayToday">
        till {{ nextHoliday.holiday }}
      </div>
      <div class="small-text" *ngIf="holidayToday">
        är det {{ nextHoliday.holiday }}
      </div>
    </div>
  `,
  styleUrls: ['./days.component.css'],
})
export class DaysComponent implements OnInit {
  hasLoaded = false;
  days: Day[];
  nextHoliday: Day;
  holidayDistance: number;
  holidayToday: boolean;

  constructor(private readonly daysService: DaysService) {}

  ngOnInit(): void {
    const todaysDate = new Date();

    this.daysService.getDays().subscribe(
      (days: Day[]) => {
        this.days = days;

        this.nextHoliday = days.find(
          (day: Day) =>
            day.holiday !== undefined &&
            (isAfter(day.date, todaysDate) || isSameDay(day.date, todaysDate))
        );

        this.holidayToday = isSameDay(todaysDate, this.nextHoliday.date);

        this.holidayDistance = differenceInCalendarDays(
          this.nextHoliday.date,
          todaysDate
        );

        this.hasLoaded = true;
      },
      (error: any) => console.log(error)
    );
  }
}
