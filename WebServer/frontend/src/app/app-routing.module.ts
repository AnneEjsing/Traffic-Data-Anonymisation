import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: HomepageComponent },
      { path: "login", component: LoginComponent },
    ]
  },
  { path: "**", redirectTo: "" }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
