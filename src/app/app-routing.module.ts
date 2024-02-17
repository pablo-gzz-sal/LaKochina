import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
    {path: '', component: DashboardComponent,  data: { animation: 'HomePage' }},
    {path: 'contact', component: ContactComponent,  data: { animation: 'ContactPage' }},
    {path: 'menu', component: MenuComponent,  data: { animation: 'MenuPage' }}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}