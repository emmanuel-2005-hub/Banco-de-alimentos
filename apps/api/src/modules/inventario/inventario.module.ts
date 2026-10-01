import { Module } from '@nestjs/common';
import { DonantesService } from './services/donantes.service';
import { ReferenciasService } from './services/referencias.service';
import { RecepcionService } from './services/recepcion.service';

@Module({
  providers: [DonantesService, ReferenciasService, RecepcionService],
  exports: [DonantesService, ReferenciasService, RecepcionService],
})
export class InventarioModule {}
