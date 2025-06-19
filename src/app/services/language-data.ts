import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageData {


  private currentLanguage = new BehaviorSubject<string>('');
  currentLanguage$ = this.currentLanguage.asObservable();

  setLanguage(language: string) {
    this.currentLanguage.next(language);
  }

 
}

  // private languages = [
  //   {
  //     id: 'javascript',
  //     name: 'JavaScript',
  //     definition: 'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is a language that is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm.',
  //     features: [
  //       'Client-side scripting for web applications',
  //       'Asynchronous programming with promises/async-await',
  //       'First-class functions'
  //     ],
  //     icon: 'assets/icons/javascript.svg',
  //     color: '#f0db4f'
  //   },
  //   {
  //     id: 'python',
  //     name: 'Python',
  //     definition: 'Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991, Python\'s design philosophy emphasizes code readability with its notable use of significant whitespace.',
  //     features: [
  //       'Extensive standard library',
  //       'Dynamically typed',
  //       'Supports multiple programming paradigms'
  //     ],
  //     icon: 'assets/icons/python.svg',
  //     color: '#3776ab'
  //   },
  //   {
  //     id: 'java',
  //     name: 'Java',
  //     definition: 'Java is a general-purpose programming language that is class-based, object-oriented, and designed to have as few implementation dependencies as possible.',
  //     features: [
  //       'Write once, run anywhere (WORA)',
  //       'Strongly typed',
  //       'Automatic memory management'
  //     ],
  //     icon: 'assets/icons/java.svg',
  //     color: '#007396'
  //   },
  //   {
  //     id: 'csharp',
  //     name: 'C#',
  //     definition: 'C# is a general-purpose, multi-paradigm programming language encompassing strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented, and component-oriented programming disciplines.',
  //     features: [
  //       'Developed by Microsoft',
  //       'Part of the .NET framework',
  //       'Modern language features'
  //     ],
  //     icon: 'assets/icons/csharp.svg',
  //     color: '#239120'
  //   },
  //   {
  //     id: 'typescript',
  //     name: 'TypeScript',
  //     definition: 'TypeScript is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for development of large applications and transcompiles to JavaScript.',
  //     features: [
  //       'Static typing',
  //       'Better tooling at scale',
  //       'Superset of JavaScript'
  //     ],
  //     icon: 'assets/icons/typescript.svg',
  //     color: '#3178c6'
  //   }
  // ];

  // getLanguages() {
  //   return this.languages;
  // }

  // getLanguageById(id: string) {
  //   return this.languages.find(lang => lang.id === id);
  // }