import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-join-breadcrumb',
  template: `<nav aria-label="breadcrumb" class="breadcrumb">
    <a routerLink="/">Home</a> / <a routerLink="/join/demo">Join</a>
  </nav>`,
  styles: [`.breadcrumb{font-size:.9rem;color:#666;margin:.5rem 0} .breadcrumb a{text-decoration:none}`]
})
export class JoinBreadcrumbComponent {}
