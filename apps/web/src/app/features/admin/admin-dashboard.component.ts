import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <section class="admin">
      <h1>Admin Dashboard</h1>
      <p>Stubbed admin area. TODO: add RBAC and management panels.</p>
    </section>
  `,
  styles: [`.admin{padding:1rem}`]
})
export class AdminDashboardComponent {}
