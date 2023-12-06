'use client'

import { useState } from "react";
import DrawerBase from "./DrawerBase";

export default function DrawerProblem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        Trigger Drawer
      </button>
      <DrawerBase isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <button type="button" onClick={() => setIsOpen(false)}>
          Close
        </button>
        <p>The drawer content!</p>
        <input type="text" />
      </DrawerBase>
    </div>
  );
}