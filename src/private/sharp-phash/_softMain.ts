import { globalMain } from './global-main';
import { rConnect } from './rConnect';

const dir =
  '/media/luxcium/01a90322-9216-4729-85ce-6949708e69b6/Twinks Lover 💙💚💔/jpgs';
const grpKey = 'x00998b-Twinks-Lovers';
const validExtentions = new Set(['.png', '.jpeg', '.jpg', '.webp']);
const Rc = rConnect();

globalMain(dir, grpKey, validExtentions, Rc);
