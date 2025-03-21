import { Component, OnInit } from '@angular/core';
import { VisitService } from '../visit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { URL } from 'src/environment';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {

  images: any[] = [];
  selectedPlaces: any[] = [];
  location: string = '';

  private baseUrl = URL.prodUrl;

  constructor(
    private visitService: VisitService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Listen for query parameter changes and update location
    this.route.queryParams.subscribe(params => {
      if (params['location']) {
        this.location = params['location'].toLowerCase().trim(); // Convert to lowercase and trim spaces
        this.getImages(); // Fetch images
      } else {
        console.warn('No location provided in query params.');
        this.redirectToHome();
      }
    });
  }

  getImages(): void {
    if (!this.location) {
      console.error('Location is empty. Skipping API call.');
      return;
    }

    this.visitService.getData(this.location).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.images = data.map((image: { name: string }) => ({
            ...image,
            name: this.capitalizeFirstLetter(image.name)
          }));
        } else {
          console.warn(`No images found for location: ${this.location}`);
          this.redirectToHome();
        }
      },
      error: (error) => {
        console.error('Error fetching images:', error);
        this.redirectToHome();
      }
    });
  }

  redirectToHome(): void {
    alert(`No images found for "${this.location}". Redirecting to home.`);
    this.router.navigate(['/']); // Redirect to home
  }

  capitalizeFirstLetter(word: string): string {
    return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
  }

  addtoCartAndStore(image: any): void {
    const isLoggedIn = this.userService.getLoggedInUser() !== null;

    if (isLoggedIn) {
      if (!this.isSelected(image)) {
        const username = this.userService.getLoggedInUser();
        const location = this.location;
        const place = { name: image.name, location, username };

        this.selectedPlaces.push(place);

        this.visitService.storeSelectedPlaces({
          username,
          location,
          selectedPlaces: [place.name]
        }).subscribe({
          next: (response) => {
            console.log('Selected places stored successfully:', response);
          },
          error: (error) => {
            console.error('Error storing selected places:', error);
            alert('Error storing selected places. Check console for details.');
          }
        });
      } else {
        alert('This place has already been added to your visit.');
      }
    } else {
      this.router.navigate(['/signin']);
    }
  }

  isSelected(image: any): boolean {
    return this.selectedPlaces.some((selectedPlace) => selectedPlace.name === image.name);
  }

  getSelectedPlaceCount(): number {
    return this.selectedPlaces.length;
  }

  getSelectedPlaceNames(): string[] {
    return this.selectedPlaces.map(place => place.name);
  }

  getImageUrl(imageName: string): string {
    return `${this.baseUrl}/image/images/${imageName}`;
  }
}
