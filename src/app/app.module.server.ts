import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [FormsModule,
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
