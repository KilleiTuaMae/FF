import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService, UserProfile } from './services/auth.service';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, RouterLinkActive, RouterModule], 
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  public nomeUsuarioDisplay = 'Visitante';
  public isLoggedIn$: Observable<boolean>;
  
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Gastos', url: '/gastos', icon: 'wallet' },
    { title: 'Opções', url: '/opcoes', icon: 'settings' },
  ];

  constructor() {
    this.isLoggedIn$ = this.authService.user$.pipe(
      map(user => !!(user && !user.isAnonymous))
    );
  }

  ngOnInit() {
    this.handleInitialNavigation();
    this.loadUserName();
  }

  private handleInitialNavigation() {
    this.authService.user$.pipe(
      filter(user => user !== undefined),
      take(1)
    ).subscribe(user => {
      const isUserLogged = user && !user.isAnonymous;
      const currentUrl = this.router.url;
      
      if (!isUserLogged && currentUrl !== '/login') {
        this.router.navigateByUrl('/login');
      }
      else if (isUserLogged && currentUrl === '/login') {
          this.router.navigateByUrl('/home');
      }
    });
  }

  async loadUserName() {
    this.authService.user$.subscribe(async user => {
      const uid = user && !user.isAnonymous ? user.uid : null;
      
      if (uid) {
        const profile = await this.authService.getUserProfile(uid);
        this.nomeUsuarioDisplay = profile?.nome || 'Usuário Logado';
      } else {
        this.nomeUsuarioDisplay = 'Visitante';
      }
    });
  }

  async doLogout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}