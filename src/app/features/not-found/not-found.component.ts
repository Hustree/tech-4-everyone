import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Page not found</h1>
    <p><a routerLink="/">Back to home</a></p>
  `,
})
export class NotFoundComponent {}
