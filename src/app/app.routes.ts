import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat/chat.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
  {path: '',redirectTo:'home',pathMatch:'full'},
  {path: 'home',component:HomeComponent},
  {path: 'chat',component:ChatComponent},
  {path:'**',redirectTo:'home'}
];
