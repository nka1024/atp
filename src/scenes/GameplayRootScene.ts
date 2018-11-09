/**
* @author       Kirill Nepomnyaschiy <nka1024@gmail.com>
* @copyright    nka1024
* @description  nomads
* @license      Apache 2.0
*/


import { AssetsLoader } from "../AssetsLoader";
import { GameObjects } from "phaser";
import { Point } from "../types/Position";
import { CONST } from "../const/const";


export class GameplayRootScene extends Phaser.Scene {
  // objects
  private escapeKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "GameplayRootScene"
    });
    
  }

  preload() {
    AssetsLoader.preload(this);
  }

  injectDependencies() {
  }

  private onWindowResize(w: number, h: number) {
    this.cameras.main.setSize(w, h);
    if (w < 500) {
      this.cameras.main.zoom = 1;
    } else if (w <= 1280) {
      this.cameras.main.zoom = 2;
    } else  {
      this.cameras.main.zoom = 3;
    }
  }

  create(data): void {

    this.injectDependencies();
    this.cameras.main.setBackgroundColor(0x1f1f1f);


    this.events.on('resize', (w: number, h: number) => this.onWindowResize(w, h));
    // this.add.existing(player);
    // this.cameras.main.centerOn(player.x, player.y);

    this.onWindowResize(window.innerWidth, window.innerHeight);

    this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update(): void {
    if (this.escapeKey.isDown) {
      this.escapeKey.isDown = false;
    }
  }
}
