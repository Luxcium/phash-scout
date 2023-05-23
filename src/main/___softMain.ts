import { rConnect } from '../tools';
import { globalMain } from './globalMain';

const dir = '/home/luxcium/Téléchargements/telegram/chris/photos-x_copy';
const grpKey = 'x00998b';
const validExtentions = new Set(['.png', '.jpeg', '.jpg', '.webp']);
const Rc = rConnect();

globalMain(dir, grpKey, validExtentions, Rc);
