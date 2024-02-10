import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  stores: any[] = [];
  title = 'frontend4'
  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }


  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
  ngOnInit(): void {
    this.getStores();

  }
  getStores() {
    this.storeService.getDataStores().subscribe(
      (response) => {
        this.stores = response;
      },
      (error) => {
        console.error('Error fetching stores:', error);
      }
    );
  }
}
