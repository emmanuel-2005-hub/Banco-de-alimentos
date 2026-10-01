import { Injectable } from '@nestjs/common';

export interface Donante {
  id: string;
  nombre: string;
  tipo: 'persona' | 'empresa';
  email?: string;
  telefono?: string;
  createdAt: Date;
}

export interface CrearDonanteInput {
  nombre: string;
  tipo: 'persona' | 'empresa';
  email?: string;
  telefono?: string;
}

@Injectable()
export class DonantesService {
  private donantes: Donante[] = [];

  crearDonante(input: CrearDonanteInput): Donante {
    if (!input?.nombre?.trim()) {
      throw new Error('El nombre del donante es obligatorio');
    }

    const tipo = input.tipo?.toLowerCase();
    if (tipo !== 'persona' && tipo !== 'empresa') {
      throw new Error('El tipo de donante es inválido');
    }

    const donante: Donante = {
      id: `donante-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      nombre: input.nombre.trim(),
      tipo,
      email: input.email?.trim(),
      telefono: input.telefono?.trim(),
      createdAt: new Date(),
    };

    this.donantes.push(donante);
    return donante;
  }

  obtenerDonantePorId(id: string): Donante | undefined {
    return this.donantes.find((donante) => donante.id === id);
  }

  listarDonantes(): Donante[] {
    return [...this.donantes];
  }
}
