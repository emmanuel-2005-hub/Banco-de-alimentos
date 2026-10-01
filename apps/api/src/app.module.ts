import { Module } from '@nestjs/common';
import { InventarioModule } from './modules/inventario/inventario.module';

@Module({
  imports: [InventarioModule],
})
export class AppModule {}
