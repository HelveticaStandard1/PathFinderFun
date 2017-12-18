import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from '../chat/chat.component';
import {WhiteboardComponent} from "../whiteboard/whiteboard.component";

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'board', component: WhiteboardComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRouterModule { }
