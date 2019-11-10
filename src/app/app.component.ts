import {Component, OnInit} from '@angular/core';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lab10-mean';

  // tslint:disable-next-line:ban-types
  lista = null;
  prod = {
    _id: null,
    descripcion: null,
    precio: null
  };

  constructor(private productosServicio: ProductosService) {}

  ngOnInit() {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.productosServicio.listar().subscribe(result => {
      this.lista = result;
    });
  }

  nuevo() {
    this.productosServicio.nuevo(this.prod).subscribe(result => {
      if (result === 'ok') {
        this.recuperarTodos();
        this.limpiar();
      }
    });
  }

  eliminar(codigo) {
    if (!confirm('Esta seguro que desea eliminar este registro?'))
      return;
    this.productosServicio.eliminar(codigo).subscribe(result => {
      if (result === 'ok') {
        this.recuperarTodos();
      }
    });
  }

  actualizar() {
    this.productosServicio.actualizar(this.prod).subscribe(result => {
      // @ts-ignore
      if (result.nModified === '1') {
        this.recuperarTodos();
        this.limpiar();
      }
    });
  }

  mostrar(codigo) {
    this.productosServicio.mostrar(codigo).subscribe(result => {
      // @ts-ignore
      this.prod = result;
    });
  }

  hayRegistros() {
    if (this.lista) {
      return true;
    }
  }

  limpiar() {
    this.prod = {
      _id: null,
      descripcion: null,
      precio: null
    };
  }
}
