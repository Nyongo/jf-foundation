import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeroSliderComponent } from '../hero-slider/hero-slider.component';
import { ImpactStatsComponent } from '../impact-stats/impact-stats.component';
import { KeyFocusComponent } from '../key-focus/key-focus.component';
import { PartnersComponent } from '../partners/partners.component';

interface ImpactStat { value: string; label: string; }

@Component({
  selector: 'app-home-new',
  standalone: true,
  templateUrl: './home-new.component.html',
  imports: [
    CommonModule,
    HeroSliderComponent,
    ImpactStatsComponent,
    KeyFocusComponent,
    PartnersComponent,
    HttpClientModule
  ],
  styleUrls: ['./home-new.component.scss']
})
export class HomeNewComponent implements OnInit {
  // Computed percentages
  femaleDirectorPercentage = 0;
  femaleTeacherPercentage  = 0;
  femaleStudentPercentage  = 0;

  impactStats: ImpactStat[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://evzen.duckdns.org/spreadsheet/read?spreadsheetId=1E5FXJjfQBEj41OzXaJJ1vzwolLnoSe-FiVjIju9UbZA').subscribe(data => {
      // DIRECTORS
      const ds = data.directorsStat;
      if (ds && ds.total > 0) {
        this.femaleDirectorPercentage = Math.round((ds.female / ds.total) * 100);
      }

      // TEACHERS
      const totalTeachers       = data.totalTeachers;
      const totalFemaleTeachers = data.totalFemaleTeachers;
      if (totalTeachers > 0) {
        this.femaleTeacherPercentage = Math.round((totalFemaleTeachers / totalTeachers) * 100);
      }

      // STUDENTS
      const totalStudents       = data.totalEnrolment;
      const totalFemaleStudents = data.totalFemaleStudents;
      if (totalStudents > 0) {
        this.femaleStudentPercentage = Math.round((totalFemaleStudents / totalStudents) * 100);
      }

       // 1. Schools reached with Jackfruit program
      this.impactStats.push({
        value: `${data.totalNoOfSchools.toLocaleString()}+`,
        label: 'Schools reached with Jackfruit program'
      });

      // 2. Students enrolled in Jackfruit schools
      this.impactStats.push({
        value: `${data.totalEnrolment.toLocaleString()}+`,
        label: 'Students enrolled in Jackfruit schools'
      });

      // 3. Parents with children enrolled in the participating schools
      this.impactStats.push({
        value: `${Math.round(data.totalEnrolment * 1.6).toLocaleString()}+`,
        label: 'Parents with children enrolled in the participating schools'
      });

      // 4. Female school directors empowered
      const femaleDirectorPct = ds.total > 0
        ? Math.round((ds.female / ds.total) * 100)
        : 0;
      this.impactStats.push({
        value: `${femaleDirectorPct}%`,
        label: 'Female school directors empowered'
      });

      // 5. School teachers trained in our program
      this.impactStats.push({
        value: `${data.totalTeachers.toLocaleString()}+`,
        label: 'School teachers trained in our program'
      });


    });
  }
}
