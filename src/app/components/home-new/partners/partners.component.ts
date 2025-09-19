import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface Partner {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {
  partners: Partner[] = [
    { src: 'assets/images/clients/waterloo.png',          alt: 'Waterloo Foundation' },
    { src: 'assets/images/clients/idp.png',               alt: 'IDP Foundation' },
    { src: 'assets/images/clients/global-schools.png',    alt: 'Global Schools' },
    { src: 'assets/images/clients/opportunity-int.png',   alt: 'Opportunity International' },
    { src: 'assets/images/clients/deg.png',               alt: 'DEG' },
    { src: 'assets/images/clients/save_the_children.png', alt: 'Save The Children' },
    { src: 'assets/images/clients/laureus.jpg',           alt: 'Laureus' },
    { src: 'assets/images/clients/treebeard.jpg',         alt: 'Tree Beard' },
    { src: 'assets/images/clients/teach-united.png',      alt: 'Teach United' },
    { src: 'assets/images/clients/chezacheza.png',        alt: 'ChezaCheza' },
    { src: 'assets/images/clients/duara.png',             alt: 'Duara Schools' },
    { src: 'assets/images/clients/nature-lock.png',       alt: 'Nature Lock' },
    { src: 'assets/images/clients/dalberg.gif',           alt: 'Dalberg' },
    { src: 'assets/images/clients/global-partnerships.jpeg', alt: 'Global Partnerships' }
  ];
}
