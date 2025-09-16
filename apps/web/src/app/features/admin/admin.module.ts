import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminBreadcrumbComponent } from './admin.breadcrumb';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent }
];

@NgModule({
  declarations: [AdminDashboardComponent, AdminBreadcrumbComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [AdminBreadcrumbComponent]
})
export class AdminModule {}
