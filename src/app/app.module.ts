import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import {SocketService} from './socket.service';
import {FormsModule} from '@angular/forms';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import {AppRouterModule} from "./app-router/app-router.module";


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    WhiteboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
