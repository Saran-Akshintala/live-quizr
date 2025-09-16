import { Component } from '@angular/core';

@Component({
  selector: 'app-lobby',
  template: `
    <section class="lobby">
      <h1>Lobby</h1>
      <p>Waiting for host to start… (demo)</p>
    </section>
  `,
  styles: [`.lobby{padding:1rem}`]
})
export class LobbyComponent {}
