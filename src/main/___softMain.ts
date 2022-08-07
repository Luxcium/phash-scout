import { rConnect } from '../tools/rConnect';
import { globalMain } from './globalMain';

const dir = '/home/luxcium/Téléchargements/test';
const grpKey = 'x00998b';
const validExtentions = new Set(['.png', '.jpeg', '.jpg', '.webp']);
const Rc = rConnect();

globalMain(dir, grpKey, validExtentions, Rc);
