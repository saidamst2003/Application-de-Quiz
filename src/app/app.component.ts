import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import{HomeComponent}from './home/home.component'
import{QuizComponent}from './quiz/quiz.component'
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,HomeComponent,QuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'mon-app';
}
