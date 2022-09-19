export class Recipe {
  public name: string;
  public description: string;
  public image: string;

  constructor(name: string, description: string, image: string) {
    this.name = name;
    this.image = image;
    this.description = description;
  }
}
