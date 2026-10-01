import { Injectable } from '@nestjs/common';
import { DonantesService } from './donantes.service';
import { ReferenciasService } from './referencias.service';

export interface Recepcion {
  id: string;
  donanteId: string;
  referenciaId: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
  estado: 'recibida' | 'pendiente';
  fecha: Date;
}

export interface RegistrarRecepcionInput {
  donanteId: string;
  referenciaId: string;
  cantidad: number;
  unidad: string;
  observaciones?: string;
}

@Injectable()
export class RecepcionService {
  private recepciones: Recepcion[] = [];

  constructor(
    private readonly donantesService: DonantesService,
    private readonly referenciasService: ReferenciasService,
  ) {}

  registrarRecepcion(input: RegistrarRecepcionInput): Recepcion {
    if (!input?.donanteId?.trim()) {
      throw new Error('El donante es obligatorio');
    }

    if (!input?.referenciaId?.trim()) {
      throw new Error('La referencia es obligatoria');
    }

    if (!input?.unidad?.trim()) {
      throw new Error('La unidad de la recepción es obligatoria');
    }

    if (input.cantidad <= 0) {
      throw new Error('La cantidad recibida debe ser mayor a cero');
    }

    const donante = this.donantesService.obtenerDonantePorId(input.donanteId);
    if (!donante) {
      throw new Error('El donante no existe');
    }

    const referencia = this.referenciasService.obtenerReferenciaPorId(input.referenciaId);
    if (!referencia) {
      throw new Error('La referencia no existe');
    }

    const recepcion: Recepcion = {
      id: `recepcion-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      donanteId: donante.id,
      referenciaId: referencia.id,
      cantidad: input.cantidad,
      unidad: input.unidad.trim(),
      observaciones: input.observaciones?.trim(),
      estado: 'recibida',
      fecha: new Date(),
    };

    this.recepciones.push(recepcion);
    return recepcion;
  }

  listarRecepciones(): Recepcion[] {
    return [...this.recepciones];
  }

  obtenerRecepcionPorId(id: string): Recepcion | undefined {
    return this.recepciones.find((recepcion) => recepcion.id === id);
  }
}
