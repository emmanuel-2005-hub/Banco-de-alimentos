import { describe, it, expect } from 'vitest';
import { DonantesService } from './donantes.service';
import { ReferenciasService } from './referencias.service';
import { RecepcionService } from './recepcion.service';

describe('RecepcionService', () => {
  it('debe registrar una recepción válida', () => {
    const donantesService = new DonantesService();
    const referenciasService = new ReferenciasService();
    const service = new RecepcionService(donantesService, referenciasService);

    const donante = donantesService.crearDonante({
      nombre: 'Ana García',
      tipo: 'persona',
      email: 'ana@example.com',
      telefono: '555-0101',
    });

    const referencia = referenciasService.crearReferencia({
      codigo: 'FR-001',
      descripcion: 'Arroz blanco',
      categoria: 'grano',
      unidadMedida: 'kg',
      stockActual: 50,
    });

    const recepcion = service.registrarRecepcion({
      donanteId: donante.id,
      referenciaId: referencia.id,
      cantidad: 10,
      unidad: 'kg',
      observaciones: 'Ingreso de temporada',
    });

    expect(recepcion).toMatchObject({
      donanteId: donante.id,
      referenciaId: referencia.id,
      cantidad: 10,
      estado: 'recibida',
    });
    expect(referencia.stockActual).toBe(50);
    expect(service.listarRecepciones()).toHaveLength(1);
  });

  it('no permite cantidades menores o iguales a cero', () => {
    const donantesService = new DonantesService();
    const referenciasService = new ReferenciasService();
    const service = new RecepcionService(donantesService, referenciasService);

    const donante = donantesService.crearDonante({
      nombre: 'Luis Torres',
      tipo: 'persona',
    });

    const referencia = referenciasService.crearReferencia({
      codigo: 'FR-002',
      descripcion: 'Lentejas',
      categoria: 'legumbre',
      unidadMedida: 'kg',
      stockActual: 10,
    });

    expect(() =>
      service.registrarRecepcion({
        donanteId: donante.id,
        referenciaId: referencia.id,
        cantidad: 0,
        unidad: 'kg',
      }),
    ).toThrow('La cantidad recibida debe ser mayor a cero');
  });

  it('rechaza una recepción si el donante no existe', () => {
    const donantesService = new DonantesService();
    const referenciasService = new ReferenciasService();
    const service = new RecepcionService(donantesService, referenciasService);

    const referencia = referenciasService.crearReferencia({
      codigo: 'FR-003',
      descripcion: 'Frijoles',
      categoria: 'legumbre',
      unidadMedida: 'kg',
      stockActual: 20,
    });

    expect(() =>
      service.registrarRecepcion({
        donanteId: 'donante-inexistente',
        referenciaId: referencia.id,
        cantidad: 2,
        unidad: 'kg',
      }),
    ).toThrow('El donante no existe');
  });

  it('rechaza una recepción si la referencia no existe', () => {
    const donantesService = new DonantesService();
    const referenciasService = new ReferenciasService();
    const service = new RecepcionService(donantesService, referenciasService);

    const donante = donantesService.crearDonante({
      nombre: 'María López',
      tipo: 'persona',
    });

    expect(() =>
      service.registrarRecepcion({
        donanteId: donante.id,
        referenciaId: 'referencia-inexistente',
        cantidad: 2,
        unidad: 'kg',
      }),
    ).toThrow('La referencia no existe');
  });
});
