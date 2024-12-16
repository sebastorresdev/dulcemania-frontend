import { Component, inject, OnInit } from '@angular/core';
import { Pedido } from './models/Pedido';
import { OrderService } from './services/order.service';

// PrimeNG
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { Column } from '../shared/Models/Column';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomMessageService } from '../shared/services/custom-message.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    CommonModule,
    TagModule,
    DropdownModule,
    RadioButtonModule,
    RatingModule,
    FormsModule,
    InputNumberModule,
    ToolbarModule,
    CardModule,
    ReactiveFormsModule,
    DataViewModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [ConfirmationService, MessageService, CustomMessageService ]
})
export class OrdersComponent implements OnInit {
  
  pedidos! : Pedido[];

  cols!: Column[];

  selectedPedido! : Pedido;

  _pedidoService = inject(OrderService)
  
  ngOnInit(): void {
    this._pedidoService.getOrders().subscribe((data) => {
      this.pedidos = data;
      console.log(data);
    })

    this.cols = [
      { field: 'id', header: 'Codigo', customExportHeader: 'Pedido Code' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'estado', header: 'Estado' },
      { field: 'nombreVendedor', header: 'Vendedor' },
      { field: 'nombreCliente', header: 'Cliente' },
      { field: 'distrito', header: 'Distrito' },
      { field: 'direccion', header: 'Direccion' },
      { field: 'observacion', header: 'Observacion' }
  ];
  }

  getSeverity(pedido: string) {
    return pedido == 'pendiente' ? 'danger' : 'success';
}
    
}
