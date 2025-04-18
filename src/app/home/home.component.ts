// home.component.ts
import { Component, OnInit } from '@angular/core';
import { TriviaService } from './../'; // Assurez-vous que ce chemin est correct

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions: TriviaQuestion[] = [];
  loading = false;
  error = '';
  selectedCategory = 9; // Par défaut: Culture Générale
  selectedDifficulty = 'easy'; // Par défaut: Level 1

  constructor(private triviaService: TriviaService) { }

  ngOnInit(): void {
  }

  // Méthode pour charger les questions selon la catégorie et la difficulté
  loadQuestions(category: number, difficulty: string): void {
    this.loading = true;
    this.error = '';
    this.questions = [];
    
    const difficultyMapping: { [key: string]: string } = {
      'level1': 'easy',
      'level2': 'medium',
      'level3': 'hard'
    };
    
    const apiDifficulty = difficultyMapping[difficulty] || 'easy';
    
    this.triviaService.getQuestions(10, category, apiDifficulty).subscribe({
      next: (response: TriviaResponse) => {
        if (response.response_code === 0) {
          this.questions = response.results;
          // Décodage des caractères HTML dans les questions et réponses
          this.questions.forEach(q => {
            q.question = this.decodeHtmlEntities(q.question);
            q.correct_answer = this.decodeHtmlEntities(q.correct_answer);
            q.incorrect_answers = q.incorrect_answers.map(a => this.decodeHtmlEntities(a));
          });
        } else {
          this.error = 'Erreur lors du chargement des questions (code ' + response.response_code + ')';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur de connexion à l\'API';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Méthode pour charger les questions de Culture Générale
  loadCultureGenerale(level: number): void {
    const difficulty = level === 1 ? 'easy' : level === 2 ? 'medium' : 'hard';
    this.loadQuestions(9, difficulty);
  }

  // Méthode pour charger les questions d'Informatique
  loadInformatique(level: number): void {
    const difficulty = level === 1 ? 'easy' : level === 2 ? 'medium' : 'hard';
    this.loadQuestions(18, difficulty);
  }

  // Méthode pour charger les questions de Sport
  loadSport(level: number): void {
    const difficulty = level === 1 ? 'easy' : level === 2 ? 'medium' : 'hard';
    this.loadQuestions(21, difficulty);
  }

  // Utilitaire pour décoder les caractères HTML
  private decodeHtmlEntities(text: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
}