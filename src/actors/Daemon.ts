/**
* @author       Kirill Nepomnyaschiy <nka1024@gmail.com>
* @copyright    nka1024
* @description  atp
* @license      Apache 2.0
*/

import { Input, Animations } from "phaser";

export class Daemon extends Phaser.GameObjects.Sprite {

  private MAX_SPEED_X: number = 2.5;
  private MAX_SPEED_Y: number = 4;
  private ACC: number = 1;
  private JUMP: number = 6;
  private FRICT: number = 0.3;
  private GRAVITY: number = 0.3;

  private cursorKeys: Input.Keyboard.CursorKeys;
  private wasdKeys: Object;
  private attackKey: Input.Keyboard.Key;
  private uppercutKey: Input.Keyboard.Key;

  private speed = new Phaser.Geom.Point();
  private charge = new Phaser.Geom.Point();
  private chargeD = new Phaser.Geom.Point();

  private physics: boolean = true;
  private floorY: number;

  private isAttacking: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'idle_64x64');
    this.floorY = y;

    this.initialize();

    this.anims.play('idle', true);

    this.on('animationupdate', (anim: Animations.Animation, frame: Animations.AnimationFrame) => {
      if (anim.key == 'air_uppercut' || anim.key == 'uppercut') {

        if (frame.index < 7 && frame.index > 1) {
          this.physics = false;
        } else {
          this.physics = true;
        }

        if (frame.index == 7) {
          this.speed.x = this.flipX ? -2.15 : 2.15;
          this.speed.y = -4.05;
        }
      }
    });

    this.on('animationcomplete', (anim: Animations.Animation, frame: Animations.AnimationFrame) => {
      if (anim.key == 'attack' || anim.key == 'uppercut' || anim.key == 'air_uppercut') {
        this.speed.x = this.charge.x;
        this.speed.y = this.charge.y;
        this.charge.x = 0;
        this.charge.y = 0;
        this.isAttacking = false;
        this.physics = true;
      }
    });
  }

  private initialize() {
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('idle_64x64', { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1,
      repeatDelay: 0
    });

    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('run_64x64', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
      repeatDelay: 0
    });

    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNumbers('jump_64x64', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0,
      repeatDelay: 0
    });

    this.scene.anims.create({
      key: 'attack',
      frames: this.scene.anims.generateFrameNumbers('attack_64x64', { 
        frames: [0, 1, 2, 3, 4, 5, 5] 
      }),
      frameRate: 15,
      repeat: 0,
      repeatDelay: 0
    });

    this.scene.anims.create({
      key: 'attack',
      frames: this.scene.anims.generateFrameNumbers('attack_64x64', { 
        frames: [0, 1, 2, 3, 4, 5, 5] 
      }),
      frameRate: 15,
      repeat: 0,
      repeatDelay: 0
    });

    this.scene.anims.create({
      key: 'uppercut',
      // frames: this.scene.anims.generateFrameNumbers('uppercut_64x64', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8] }),
      frames: this.scene.anims.generateFrameNumbers('uppercut_64x64', { 
        frames: [0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8] 
      }),
      frameRate: 17,
      repeat: 0,
      repeatDelay: 0
    });

    this.scene.anims.create({
      key: 'air_uppercut',
      frames: this.scene.anims.generateFrameNumbers('air_uppercut_64x64', {
        frames: [0, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8]
      }),
      frameRate: 17,
      repeat: 0,
      repeatDelay: 0
    });

    this.scene.anims.create({
      key: 'air_attack',
      frames: this.scene.anims.generateFrameNumbers('air_attack_64x64', { 
        frames: [0, 1, 2, 3, 4, 4] 
      }),
      frameRate: 17,
      repeat: 0,
      repeatDelay: 0
    });

    this.wasdKeys = this.scene.input.keyboard.addKeys('W,A,S,D');
    this.attackKey = this.scene.input.keyboard.addKey('X');
    this.uppercutKey = this.scene.input.keyboard.addKey('C');
    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.updateInput();

    if (this.physics) {
      this.x += this.speed.x;
      this.y += this.speed.y;

      // apply friction
      if (Math.abs(this.speed.x) >= this.FRICT) {
        this.speed.x -= Math.sign(this.speed.x) * this.FRICT;
      } else if (Math.abs(this.speed.x) > 0 && Math.abs(this.speed.x) < this.FRICT) {
        this.speed.x = 0
      }

      // apply gravity
      if (this.y < this.floorY)
        this.speed.y += this.GRAVITY;
      else if (this.y > this.floorY) {
        this.speed.y = 0;
        this.y = this.floorY;
      }

    } else {
      this.x += this.charge.x;
      this.y += this.charge.y;
      this.charge.x += this.chargeD.x;
      this.charge.y += this.chargeD.y;
    }

    if (!this.isAttacking) {
      if (Math.abs(this.speed.y) == 0 && this.y >= this.floorY) {
        if (Math.abs(this.speed.x) > 0) {
          this.anims.play('run', true);
        } else {
          this.anims.play('idle', true);
        }
      }

      if (this.speed.x > 0) this.flipX = false;
      if (this.speed.x < 0) this.flipX = true;
    }
  }

  private updateInput() {
    if (this.cursorKeys.left.isDown || this.wasdKeys['A'].isDown) {
      this.speed.x -= this.ACC;
    }
    if (this.cursorKeys.right.isDown || this.wasdKeys['D'].isDown) {
      this.speed.x += this.ACC;
    }
    if (this.cursorKeys.up.isDown || this.wasdKeys['W'].isDown) {
      if (this.y >= this.floorY) {
        this.speed.y -= this.JUMP;
        this.anims.play('jump', true);
      }
    }
    if (this.cursorKeys.down.isDown || this.wasdKeys['S'].isDown) {
      // this.speed.y -= this.JUMP;
    }

    if (!this.isAttacking) {
      if (this.attackKey.isDown) {
        this.isAttacking = true;
        this.anims.play('attack', true);
      }

      if (this.uppercutKey.isDown) {
        this.isAttacking = true;
        this.anims.play(this.y < this.floorY ? 'air_uppercut' : 'uppercut', true);
        this.charge.x = this.flipX ? -0.4 : 0.4;
        // this.charge.x = this.flipX ? -0 : 0;
        // this.chargeD.x = this.flipX ? -0.05 : 0.05;
        // this.chargeD.y =  -0.05;
      }
    }

    this.speed.x = Phaser.Math.Clamp(this.speed.x, - this.MAX_SPEED_X, this.MAX_SPEED_X);
    this.speed.y = Phaser.Math.Clamp(this.speed.y, -this.JUMP, this.MAX_SPEED_Y);
  }
}