import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageData } from '../../services/language-data';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  languages = ['JavaScript', 'Python', 'Java', 'C++', 'Go'];
  currentLanguage = '';

  constructor(private languageService: LanguageData) {
    this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  scrollTo(language: string) {
    document.getElementById(language)?.scrollIntoView({ behavior: 'smooth' });
    this.languageService.setLanguage(language);
  }
}
