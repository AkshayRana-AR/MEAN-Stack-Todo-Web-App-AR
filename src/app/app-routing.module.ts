import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import{AddEditTaskComponent} from './add-edit-task/add-edit-task.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  {path:'',redirectTo:'/dashboard', pathMatch: 'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'addTask',component:AddEditTaskComponent},
  { path: 'addTask/:id', component:AddEditTaskComponent },
  {path:'pagenotfound',component:PageNotFoundComponent},
  {path:'**',component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
