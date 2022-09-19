import { Component, OnInit } from "@angular/core";
import { Recipe } from '../recipe.model'

@Component({
  selector: 'recipe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListRecipeComponent implements OnInit {
  recipes = [
    new Recipe('Test', 'Testing', 'Tested')
  ]

  constructor() { }

  ngOnInit(): void {

  }
}
