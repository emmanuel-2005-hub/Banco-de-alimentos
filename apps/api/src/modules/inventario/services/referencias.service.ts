import { Injectable } from '@nestjs/common';

export interface Referencia {
  id: string;
  codigo: string;
  descripcion: string;
  categoria: string;
  unidadMedida: string;
  stockActual: number;
  createdAt: Date;
}

export interface CrearReferenciaInput {
  codigo: string;
  descripcion: string;
  categoria: string;
  unidadMedida: string;
  stockActual: number;
}

@Injectable()
export class ReferenciasService {
  private referencias: Referencia[] = [];

  crearReferencia(input: CrearReferenciaInput): Referencia {
    if (!input?.codigo?.trim()) {
      throw new Error('El código de la referencia es obligatorio');
    }

    if (!input?.descripcion?.trim()) {
      throw new Error('La descripción de la referencia es obligatoria');
    }

    if (!input?.categoria?.trim()) {
      throw new Error('La categoría de la referencia es obligatoria');
    }

    if (!input?.unidadMedida?.trim()) {
      throw new Error('La unidad de medida es obligatoria');
    }

    if (input.stockActual < 0) {
      throw new Error('El stock actual no puede ser negativo');
    }

    const referencia: Referencia = {
      id: `referencia-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      codigo: input.codigo.trim(),
      descripcion: input.descripcion.trim(),
      categoria: input.categoria.trim(),
      unidadMedida: input.unidadMedida.trim(),
      stockActual: input.stockActual,
      createdAt: new Date(),
    };

    this.referencias.push(referencia);
    return referencia;
  }

  obtenerReferenciaPorId(id: string): Referencia | undefined {
    return this.referencias.find((referencia) => referencia.id === id);
  }

  listarReferencias(): Referencia[] {
    return [...this.referencias];
  }
}
