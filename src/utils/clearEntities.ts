import { BaseEntity } from 'typeorm';

export const clearEntities = async <T extends BaseEntity>(entities: T[]) => {
  for (const entity of entities) {
    await entity.remove();
  }
};
