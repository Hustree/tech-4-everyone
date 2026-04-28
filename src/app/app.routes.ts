import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent), title: 'Tech 4 Everyone' },
  { path: 'articles', loadComponent: () => import('./features/articles/articles-list.component').then(m => m.ArticlesListComponent), title: 'Articles · Tech 4 Everyone' },
  { path: 'articles/:slug', loadComponent: () => import('./features/articles/article-detail.component').then(m => m.ArticleDetailComponent) },
  { path: 'top-tens', loadComponent: () => import('./features/top-tens/top-tens-list.component').then(m => m.TopTensListComponent), title: 'Top-ten lists · Tech 4 Everyone' },
  { path: 'top-tens/:slug', loadComponent: () => import('./features/top-tens/top-ten-detail.component').then(m => m.TopTenDetailComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent), title: 'About · Tech 4 Everyone' },
  { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'Not found · Tech 4 Everyone' },
];
