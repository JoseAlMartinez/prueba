import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {

  // Traer los datos de firebase
  alumnoList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados, del tipo alumno
  selectedAlumno: Alumno = new Alumno();

  constructor(private firebase: AngularFireDatabase) { }

  // Traer todos los alumnoa desde firebase 
  getAlumno() { // guarda los elementos en la varible 'alumno'
    return this.alumnoList = this.firebase.list('alumnos');
  }

  // crear un nuevo producto  , recibiendo un parametro de tipo Product
  insertAlumno(alumno: Alumno) {
    // agregar un dato al final de la lista, como recibe un objeto del tipo Product , puede acceder a sus propiedades
    this.alumnoList.push({
      name: alumno.name,
      lastname: alumno.lastname,
      direccion: alumno.direccion,
      age: alumno.age,
      telefono: alumno.telefono,
      correo: alumno.correo
    });
  }

  // Actualiza un producto, recibiendo un parametro de tipo Product
  updateAlumno(alumno: Alumno) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.alumnoList.update(alumno.$key, {
      name: alumno.name,
      category: alumno.lastname,
      location: alumno.direccion,
      age: alumno.age,
      telefono: alumno.telefono,
      correo: alumno.correo
    });
  }

  // Elimina un producto, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  deleteAlumno($key: string) {
    this.alumnoList.remove($key);
  }

}
