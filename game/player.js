import { createGun, shootGun } from "./gun";
let player = null;
let physicsGroup = null;
let globalEnemy = null;

const velocity = {
  x: 0,
  y: 0
};

export const createPlayer = ({ scene, enemy }) => {
  globalEnemy = enemy;
  physicsGroup = scene.physics.add.group({
    // Initial angular speed of 60 degrees per second.
    // Drag reduces it by 5 degrees/s per second, thus to zero after 12 seconds.
    bounceX: .3,
    bounceY: .3,
    collideWorldBounds: true,
    dragX: 40,
    dragY: 40
  });
  player = scene.add.sprite(100, 200, "beball");
  physicsGroup.add(player);

  createGun(scene);
  return player
};

export const updatePlayerPosition = (velocityX, velocityY) => {
  velocity.x = velocity.x + velocityX;
  velocity.y = velocity.y + velocityY;

  physicsGroup.setVelocity(velocity.x, velocity.y);
};

export const shoot = ({ x, y }) => {
  const { x: playerX, y: playerY } = player;
  shootGun({
    fromX: playerX,
    fromY: playerY,
    toX: x,
    toY: y,
    enemy: globalEnemy
  });
  // gun.on = true;
  // gun.x = playerX;
  // gun.y = playerY;
  // gun.moveToX = x;
  // gun.moveToY = y;
};
