import { DetallePedido } from "./DetallePedido"

export interface Pedido {
    id: number
    fecha: string
    estado: string
    total: number
    nombreVendedor: string
    nombreCliente: string
    distrito: string
    direccion: string
    observacion: string
    detallePedidos: DetallePedido[]
  }