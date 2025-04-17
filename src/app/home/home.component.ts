// home.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit(): void {
    this.createStars();
    this.createMeteors();
    this.setupSpaceKeyEasterEgg();
  }
  
  createStars(): void {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.setProperty('--duration', `${Math.random() * 3 + 1}s`);
      starsContainer.appendChild(star);
    }
  }
  
  createMeteors(): void {
    setInterval(() => {
      const meteor = document.createElement('div');
      meteor.className = 'meteor';
      meteor.style.top = `${Math.random() * 100}%`;
      meteor.style.left = '100%';
      document.body.appendChild(meteor);
      setTimeout(() => meteor.remove(), 2000);
    }, 3000);
  }
  
  setupSpaceKeyEasterEgg(): void {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        document.body.style.background = `hsl(${Math.random() * 360}, 50%, 15%)`;
        setTimeout(() => document.body.style.background = '', 500);
      }
    });
  }
}