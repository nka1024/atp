/**
* @author       Kirill Nepomnyaschiy <nka1024@gmail.com>
* @copyright    nka1024
* @description  atp
* @license      Apache 2.0
*/

import { CONST } from "./const/const";

export class AssetsLoader {
  public static preload(scene: Phaser.Scene) {

    scene.load.image("progress_yellow_50x2", "./assets/progress_yellow_50x2.png");
    scene.load.image("progress_black_52x4", "./assets/progress_black_52x4.png");

    scene.load.image("progress_green_32x2", "./assets/progress_green_32x2.png");
    scene.load.image("progress_black_34x4", "./assets/progress_black_34x4.png");

    scene.load.bitmapFont('pokemon-8-white',
      './assets/fonts/pokemon/pokemon-8-white.png',
      './assets/fonts/pokemon/pokemon-8.fnt');
    scene.load.bitmapFont('pokemon-8-shadow',
      './assets/fonts/pokemon/pokemon-8-shadow.png',
      './assets/fonts/pokemon/pokemon-8.fnt');
    scene.load.bitmapFont('pokemon-8-red',
      './assets/fonts/pokemon/pokemon-8-red.png',
      './assets/fonts/pokemon/pokemon-8.fnt');
    scene.load.bitmapFont('pokemon-8-yellow',
      './assets/fonts/pokemon/pokemon-8-yellow.png',
      './assets/fonts/pokemon/pokemon-8.fnt');
    scene.load.bitmapFont('pokemon-8-green',
      './assets/fonts/pokemon/pokemon-8-green.png',
      './assets/fonts/pokemon/pokemon-8.fnt');

    scene.load.spritesheet('air_attack_64x64', './assets/sprites/air_attack_64x64.png', { endFrame: 5, frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('air_uppercut_64x64', './assets/sprites/air_uppercut_64x64.png', { endFrame: 9, frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('attack_64x64', './assets/sprites/attack_64x64.png', { endFrame: 6, frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('idle_64x64', './assets/sprites/idle_64x64.png', { endFrame: 5, frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('jump_64x64', './assets/sprites/jump_64x64.png', { endFrame: 4, frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('run_64x64', './assets/sprites/run_64x64.png', { endFrame: 6, frameWidth: 64, frameHeight: 64});
    scene.load.spritesheet('uppercut_64x64', './assets/sprites/uppercut_64x64.png', { endFrame: 9, frameWidth: 64, frameHeight: 64});
  }    
}