// quiz.component.ts
import { Component, OnInit } from '@angular/core';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [
    {
      question: 'Quelle est la capitale de la France?',
      answers: ['Londres', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2
    },
    {
      question: 'Quel est le plus grand océan du monde?',
      answers: ['Atlantique', 'Indien', 'Arctique', 'Pacifique'],
      correctAnswer: 3
    },
    {
      question: 'Combien font 5 × 9?',
      answers: ['40', '45', '50', '54'],
      correctAnswer: 1
    }
  ];

  idx: number = 0;
  count: number = 0;
  selectedAnswer: number | null = null;
  correctAnswers: number = 0;
  wrongAnswers: number = 0;
  quizCompleted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.count = this.questions.length;
  }

  answered(index: number): void {
    this.selectedAnswer = index;
    if (index === this.questions[this.idx].correctAnswer) {
      this.correctAnswers++;
    } else {
      this.wrongAnswers++;
    }
  }

  nextQuestion(): void {
    if (this.idx < this.count - 1) {
      this.idx++;
      this.selectedAnswer = null;
    }
  }

  showResults(): void {
    this.quizCompleted = true;
  }

  resetQuiz(): void {
    this.idx = 0;
    this.selectedAnswer = null;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.quizCompleted = false;
  }
}