import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.scss'
})
export class ImageGridComponent {

  imageSources: string[] = [
    '../../../assets/stand.JPG',
    '../../../assets/stand.JPG',
    '../../../assets/stand.JPG',
    '../../../assets/stand.JPG',
    '../../../assets/stand.JPG',
    '../../../assets/stand.JPG',
    '../../../assets/stand.JPG',
    '../../../assets/stand.JPG',
    '../../../assets/stand.JPG',
  ];

}
