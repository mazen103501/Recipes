import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../shared/httpRequest.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor(private http: HttpRequestService) {}

  ngOnInit() {}
}
