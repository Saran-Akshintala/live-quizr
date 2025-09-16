import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DisplayScreenComponent } from './display-screen.component';
import { DisplayBreadcrumbComponent } from './display.breadcrumb';

const routes: Routes = [
  { path: '', component: DisplayScreenComponent }
];

@NgModule({
  declarations: [DisplayScreenComponent, DisplayBreadcrumbComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [DisplayBreadcrumbComponent]
})
export class DisplayModule {}
