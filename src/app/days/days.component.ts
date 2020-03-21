import { Component, OnInit } from '@angular/core';
import { DaysService } from 'src/app/days/days.service';
import { Day } from 'src/app/days/days.interface';
import { isAfter, differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-days',
  template: `
    <div class="container" *ngIf="hasLoaded">
      <div class="big-text">{{ holidayDistance }} dagar</div>
      <div class="small-text" *ngIf="isHalfDay">
        till halvdag på {{ dayBeforeHoliday.halfDay }}
      </div>
      <div class="small-text" *ngIf="!isHalfDay">
        till {{ nextHoliday.holiday }}
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
  isHalfDay = false;
  dayBeforeHoliday: Day;

  constructor(private readonly daysService: DaysService) {}

  ngOnInit(): void {
    const todaysDate = new Date();

    this.daysService.getDays().subscribe((days: Day[]) => {
      this.days = days;

      const holidayIndex = days.findIndex(
        (day: Day) => day.holiday !== undefined && isAfter(day.date, todaysDate)
      );

      this.nextHoliday = days[holidayIndex];
      this.dayBeforeHoliday = days[holidayIndex - 1];
      this.isHalfDay = this.dayBeforeHoliday.halfDay !== undefined;

      this.holidayDistance = differenceInCalendarDays(
        this.dayBeforeHoliday.halfDay
          ? this.dayBeforeHoliday.date
          : this.nextHoliday.date,
        todaysDate
      );

      this.hasLoaded = true;
    });
  }
}
