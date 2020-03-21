import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaysComponent } from 'src/app/days/days.component';


const routes: Routes = [
  {
    path: '',
    component: DaysComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
