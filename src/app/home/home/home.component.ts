import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: 'home.component.html',
  styleUrl: './home.component.scss',
  providers:[],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  private route=inject(Router);
  ngOnInit(): void {
    this.startFrom = new FormGroup({
      name:new FormControl(null,Validators.required)
    });
  }
  startFrom:FormGroup;
  start(){
    if(this.startFrom.valid){
      localStorage.setItem('userId',crypto.randomUUID());
      localStorage.setItem('userName',this.startFrom.get('name').value);
      this.route.navigateByUrl('chat');
    }
  }
 }
