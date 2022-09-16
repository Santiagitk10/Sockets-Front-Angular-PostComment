import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { MainComponent } from './components/main/main.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { AuthprotectService } from './services/authprotect.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  
  {
    path: 'main',
    component: MainComponent, canActivate: [AuthprotectService]
  },

  {
    path: 'discussion/:id', component: PostComponent, canActivate: [AuthprotectService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
