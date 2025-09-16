import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JoinFormComponent } from './join-form.component';
import { LobbyComponent } from './lobby.component';
import { FormsModule } from '@angular/forms';
import { JoinBreadcrumbComponent } from './join.breadcrumb';

const routes: Routes = [
  { path: '', component: JoinFormComponent },
  { path: 'lobby', component: LobbyComponent },
];

@NgModule({
  declarations: [JoinFormComponent, LobbyComponent, JoinBreadcrumbComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  exports: [JoinBreadcrumbComponent]
})
export class JoinModule {}
