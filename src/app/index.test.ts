import {describe, expect, beforeAll, afterAll, it, jest} from '@jest/globals';
import { getCategoryPath } from './index';
import { Category } from '../types';
import { categories } from '../data';

describe('getCategoryPath', () => {
  it('debería devolver la ruta correcta para una categoría sin subcategorías', () => {
    const result = getCategoryPath(categories, 'category5');
    expect(result).toBe('/category5');
  });

  it('debería devolver la ruta correcta para una categoría con subcategorías', () => {
    const result = getCategoryPath(categories, 'category2');
    expect(result).toBe('/category1/category2');
  });

  it('debería devolver una cadena vacía si la categoría no se encuentra', () => {
    const result = getCategoryPath(categories, 'category6');
    expect(result).toBe('');
  });

  it('debería devolver la ruta correcta para una categoría anidada', () => {
    const result = getCategoryPath(categories, 'category4');
    expect(result).toBe('/category1/category3/category4');
  });
});