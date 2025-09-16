import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutBreadcrumbComponent } from './about.breadcrumb';
import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: '', component: AboutComponent }
];

@NgModule({
  declarations: [AboutBreadcrumbComponent],
  imports: [CommonModule, RouterModule.forChild(routes), AboutComponent],
  exports: [AboutBreadcrumbComponent]
})
export class AboutModule {}
