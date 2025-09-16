import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HostShellComponent } from './host-shell.component';
import { HostControlsComponent } from './host-controls.component';
import { LiveStatsComponent } from './live-stats.component';
import { HostBreadcrumbComponent } from './host.breadcrumb';

const routes: Routes = [
  { path: '', component: HostShellComponent }
];

@NgModule({
  declarations: [HostShellComponent, HostControlsComponent, LiveStatsComponent, HostBreadcrumbComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [HostBreadcrumbComponent]
})
export class HostModule {}
