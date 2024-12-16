import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { ThemeLayoutService } from '../theme-layout.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
    items: MenuItem[] | undefined;
    _themeService = inject(ThemeLayoutService);

    ngOnInit() {
      this.items = [
        {
            label: 'Ventas',
            icon: 'pi pi-shopping-cart',
            items: [
                {
                    label: 'Registrar Ventas',
                    icon: 'pi pi-plus',
                    routerLink:'ventas'
                },
                {
                    label: 'Historial de Ventas',
                    icon: 'pi pi-clock',
                    routerLink:'ventas/historial-ventas'
                },
                {
                    label: 'Ventas Canceladas',
                    icon: 'pi pi-ban',
                },
            ]
        },
        {
            label: 'Pedidos',
            icon: 'pi pi-inbox',
            items: [
                {
                    label: 'Registrar Pedido',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Listar Pedido',
                    icon: 'pi pi-list',
                    routerLink:'pedidos'
                },
                {
                    label: 'Seguimiento de Pedidos',
                    icon: 'pi pi-map',
                },
                {
                    label: 'Pedidos Pendientes',
                    icon: 'pi pi-exclamation-circle',
                },
                {
                    label: 'Pedidos Completados',
                    icon: 'pi pi-check-circle',
                }
            ]
        },
        {
            label: 'Clientes',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'Registrar Cliente',
                    icon: 'pi pi-user-plus',
                },
                {
                    label: 'Historial de Compras',
                    icon: 'pi pi-calendar',
                },
                {
                    label: 'Clientes Frecuentes',
                    icon: 'pi pi-star',
                },
                {
                    label: 'Enviar Notificaciones',
                    icon: 'pi pi-send',
                }
            ]
        },
        {
            label: 'Almacén',
            icon: 'pi pi-box',
            items: [
                {
                    label: 'Registrar Producto',
                    icon: 'pi pi-plus',
                    routerLink:'inventario/productos'
                },
                {
                    label: 'Movimiento de productos',
                    icon: 'pi pi-arrow-right-arrow-left',
                },
                {
                    label: 'Productos con Bajo Stock',
                    icon: 'pi pi-exclamation-circle',
                },
                {
                    label: 'Categorías de Productos',
                    icon: 'pi pi-tags',
                },
                {
                    label: 'Reportes de Inventario',
                    icon: 'pi pi-chart-bar',
                }
            ]
        },
        {
            label: 'Facturación',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'Generar Comprobantes',
                    icon: 'pi pi-file-edit',
                },
                {
                    label: 'Consultar Comprobantes',
                    icon: 'pi pi-search',
                },
                {
                    label: 'Facturas Pendientes',
                    icon: 'pi pi-exclamation-circle',
                },
                {
                    label: 'Notas de Crédito',
                    icon: 'pi pi-credit-card',
                }
            ]
        },
        {
            label: 'Reportes',
            icon: 'pi pi-chart-line',
            items: [
                {
                    label: 'Reporte de Ventas',
                    icon: 'pi pi-chart-bar',
                },
                {
                    label: 'Reporte de Pedidos',
                    icon: 'pi pi-chart-pie',
                },
                {
                    label: 'Reporte de Clientes',
                    icon: 'pi pi-user',
                },
                {
                    label: 'Reporte de Inventario',
                    icon: 'pi pi-box',
                },
                {
                    label: 'Reporte de Facturación',
                    icon: 'pi pi-file-pdf',
                }
            ]
        },
        {
            label: 'Configuraciones',
            icon: 'pi pi-cog',
            items: [
                {
                    label: 'Métodos de Pago',
                    icon: 'pi pi-wallet',
                },
                {
                    label: 'Promociones',
                    icon: 'pi pi-tags',
                },
                {
                    label: 'Gestión de Usuarios',
                    icon: 'pi pi-user-edit',
                    items:[
                        {
                            label: 'Usuarios',
                            icon: 'pi pi-user'
                        },
                        {
                            label: 'Roles',
                            icon:'pi pi-key'
                        }
                    ]
                },
                {
                    label: 'Parámetros del Sistema',
                    icon: 'pi pi-sliders-h',
                }
            ]
        }
    ]
    
    }
}
