import { Component, OnInit } from '@angular/core';

// model
import { Alumno } from '../../../models/alumno';

// service
import { AlumnoService } from '../../../services/alumno.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {

  alumnoList: Alumno[];

  constructor(
    private alumnoService: AlumnoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.alumnoService.getAlumno()
      .snapshotChanges().subscribe(item => {
        this.alumnoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.alumnoList.push(x as Alumno);
        });
      });
  }

  onEdit(alumno: Alumno) {
    this.alumnoService.selectedAlumno = Object.assign({}, alumno);
  }

  onDelete($key: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this.alumnoService.deleteAlumno($key);
      this.toastr.warning('Deleted Successfully', 'Alumno Removed');
    }
  }


}
