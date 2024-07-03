import React from 'react'
import { Game } from '../../game/Game';

export const Student = () => {
  return (
    <div className="admin-content">
      <div className="flex flex-col  justify-center gap-48">
        <h1 className="text-center text-cyan-400 text-4xl font-extrabold">
          Bienvenido es hora de jugar
        </h1>
        <Game />
      </div>
    </div>
  );
}
