import { PresetTask, FurnitureItem } from '@/types';

export const PRESET_TASKS: PresetTask[] = [
  // Express tasks
  {
    id: 'feed-pets',
    name: 'Alimentar a Rita, Penny y Valky',
    coins: 15,
    category: 'express',
    schedules: ['normal', 'hyrox', 'homeoffice', 'weekend'],
    icon: '🐾',
  },
  {
    id: 'make-bed',
    name: 'Acomodar la cama',
    coins: 10,
    category: 'express',
    schedules: ['normal', 'hyrox', 'homeoffice', 'weekend'],
    icon: '🛏️',
  },
  {
    id: 'pick-clothes',
    name: 'Levantar ropa del suelo',
    coins: 10,
    category: 'express',
    schedules: ['normal', 'hyrox', 'homeoffice', 'weekend'],
    icon: '👕',
  },
  {
    id: 'trash',
    name: 'Sacar la basura',
    coins: 15,
    category: 'express',
    schedules: ['normal', 'hyrox', 'homeoffice', 'weekend'],
    icon: '🗑️',
  },
  // Routine tasks
  {
    id: 'bathe-rita',
    name: 'Bañar a Rita',
    coins: 25,
    category: 'routine',
    schedules: ['normal', 'homeoffice', 'weekend'],
    icon: '🦜',
  },
  {
    id: 'cook',
    name: 'Hacer la comida',
    coins: 30,
    category: 'routine',
    schedules: ['normal', 'homeoffice', 'weekend'],
    icon: '🍲',
  },
  {
    id: 'fridge',
    name: 'Depurar refrigerador',
    coins: 25,
    category: 'routine',
    schedules: ['normal', 'homeoffice', 'weekend'],
    icon: '🧊',
  },
  // Deep clean
  {
    id: 'laundry',
    name: 'Lavar la ropa',
    coins: 40,
    category: 'deep',
    schedules: ['homeoffice', 'weekend'],
    icon: '🧺',
  },
  {
    id: 'stove',
    name: 'Limpiar la estufa',
    coins: 35,
    category: 'deep',
    schedules: ['normal', 'homeoffice', 'weekend'],
    icon: '🫧',
  },
];

export const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: 'rug',
    name: 'Rug',
    nameEs: 'Alfombra',
    cost: 100,
    icon: '🪣',
    description: 'Una alfombra suave para el sala',
  },
  {
    id: 'coffee-table',
    name: 'Coffee Table',
    nameEs: 'Mesa de centro',
    cost: 200,
    icon: '🪵',
    description: 'Mesa de madera con estilo nórdico',
  },
  {
    id: 'plant',
    name: 'Plant',
    nameEs: 'Planta',
    cost: 150,
    icon: '🪴',
    description: 'Una plantita que da vida al espacio',
  },
  {
    id: 'lamp',
    name: 'Lamp',
    nameEs: 'Lámpara',
    cost: 120,
    icon: '🪔',
    description: 'Luz cálida para las noches de cine',
  },
  {
    id: 'sofa',
    name: 'Sofa',
    nameEs: 'Sofá',
    cost: 500,
    icon: '🛋️',
    description: 'El sofá de sus sueños para descansar',
  },
];

export const CATEGORY_LABELS = {
  express: 'Express (15 min)',
  routine: 'Rutina',
  deep: 'Limpieza Profunda',
};
