import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { TopTenListComponent } from './top-ten-list/top-ten-list.component'; // Add this import

const routes: Routes = [
  { path: '', redirectTo: '/article', pathMatch: 'full' },
  { path: 'article', component: ArticleComponent },
  { path: 'top-ten', component: TopTenListComponent }, // Add this route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
