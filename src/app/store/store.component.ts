import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})

export class StoreComponent implements OnInit {
  storeId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract store ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.storeId = params.get('storeId') || 'N/A';
    });
  }
}