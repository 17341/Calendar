import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { JoinPageComponent } from './pages/join-page/join-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'join',
    component: JoinPageComponent,
  },
  {
    path: 'create',
    component: CreatePageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  //{
  //   path: 'register',
  //   component: RegisterComponent,
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
