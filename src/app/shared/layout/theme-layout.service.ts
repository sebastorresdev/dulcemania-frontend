import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeLayoutService {

    darkMode = signal(true);

    switchTheme () {
        let themeLink = document.getElementById('app-theme') as HTMLLinkElement;
        this.darkMode.set(!this.darkMode());
        if (themeLink) {
            themeLink.href = 'lara-' + (this.darkMode() ? 'dark': 'light') + '-purple.css';
        }  
    }
}
