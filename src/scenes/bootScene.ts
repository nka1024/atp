import { CONST } from "../const/const";

/**
* @author       Kirill Nepomnyaschiy <nka1024@gmail.com>
* @copyright    nka1024
* @description  atp
* @license      Apache 2.0
*/

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  update(): void {
    console.log("BootScene complete");
    this.scene.start("GameplayRootScene");
  }
}
