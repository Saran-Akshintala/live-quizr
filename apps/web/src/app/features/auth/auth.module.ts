import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { AuthBreadcrumbComponent } from './auth.breadcrumb';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthBreadcrumbComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  exports: [AuthBreadcrumbComponent]
})
export class AuthModule {}
