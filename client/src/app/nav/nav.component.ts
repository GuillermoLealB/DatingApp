import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn = false;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: user => {console.log(!!user),this.loggedIn = !!user},
      error: error => console.log(error)})
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.loggedIn = true;
      },
      error: err => console.log(err)
    })
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }

}
