/**
* @author       Kirill Nepomnyaschiy <nka1024@gmail.com>
* @copyright    nka1024
* @description  nomads
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

    // scene.load.spritesheet('mothership_48x48', './assets/sprites/mothership_48x48.png', {
    //   frameWidth: 48,
    //   frameHeight: 48,
    //   endFrame: 7
    // });
  }    
}