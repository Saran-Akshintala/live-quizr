import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo.component';

const routes: Routes = [
  { path: '', component: DemoComponent }
];

@NgModule({
  declarations: [DemoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DemoModule {}
