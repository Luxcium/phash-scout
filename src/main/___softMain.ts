import { rConnect } from '../tools';
import { globalMain } from './globalMain';

const dir = '/run/media/luxcium/x250Mio/Archives TG/Twinks Lover 💙💚💔/jpgs';
const grpKey = 'x00998b';
const validExtentions = new Set(['.png', '.jpeg', '.jpg', '.webp']);
const Rc = rConnect();

globalMain(dir, grpKey, validExtentions, Rc);
