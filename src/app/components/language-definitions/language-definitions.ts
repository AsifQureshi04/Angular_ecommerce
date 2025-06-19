import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LanguageData } from '../../services/language-data';

@Component({
  selector: 'app-language-definitions',
  standalone: false,
  templateUrl: './language-definitions.html',
  styleUrl: './language-definitions.scss'
})
export class LanguageDefinitions {
  @ViewChildren('section') sections!: QueryList<ElementRef>;

  constructor(private languageService: LanguageData) {}

  ngAfterViewInit(): void {
    this.onScroll();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    let current: string = '';
    this.sections.forEach((section: ElementRef) => {
      const rect = section.nativeElement.getBoundingClientRect();
      console.log(rect);
      if (rect.top >= 0 && rect.top <= 150) {
        current = section.nativeElement.id;
      }
    });
    console.log('current',current);
    if (current) {
      this.languageService.setLanguage(current);
    }
      console.log("Scrolling");
  }
}
