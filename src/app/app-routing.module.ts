import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from './components/form-page/form-page.component';

const routes: Routes = [
  {path: '', component: FormPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
