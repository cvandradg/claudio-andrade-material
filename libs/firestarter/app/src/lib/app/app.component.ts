import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/module';

@Component({
  selector: 'material-workspace-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [AppComponent],
  exports: [AppComponent],
})
export class AppComponentModule {}
