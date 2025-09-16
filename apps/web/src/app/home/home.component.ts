import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  readonly links = [
    { label: 'About', path: '/about' },
    { label: 'Events', path: '/events' },
    { label: 'Host (demo)', path: '/host/demo' },
    { label: 'Display (demo)', path: '/display/demo' },
    { label: 'Join (demo)', path: '/join/demo' },
    { label: 'Admin', path: '/admin' },
    { label: 'Demo Mode', path: '/demo' },
  ];
}
