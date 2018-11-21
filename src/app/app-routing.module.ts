import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//=====
// components
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
// components
//=====


//=====
// services
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

// services
//=====
const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/new', component: BookFormComponent },
  { path: 'books/view/:id', component: SingleBookComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // tracer les ROUTES
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
