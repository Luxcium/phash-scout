import * as tf from '@tensorflow/tfjs-node-gpu';

if (tf !== undefined) {
  tf.node;
  console.log('tf.math :>>', tf.node);
}
