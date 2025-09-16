import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './events-list.component';
import { EventDetailComponent } from './event-detail.component';
import { EventsBreadcrumbComponent } from './events.breadcrumb';

const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: ':id', component: EventDetailComponent },
];

@NgModule({
  declarations: [EventsListComponent, EventDetailComponent, EventsBreadcrumbComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [EventsBreadcrumbComponent]
})
export class EventsModule {}
