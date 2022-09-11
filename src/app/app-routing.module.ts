import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { MainComponent } from './components/main/main.component';
import { NewpostComponent } from './components/newpost/newpost.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'newpost', 
    component: NewpostComponent
  },
  {
    path: 'discussion/:id', component: PostComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
