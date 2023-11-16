'use client'

import { useEffect } from 'react';

export default function RedirectPage(){
  useEffect(() => {
    // window.location.href = 'https://www.youtube.com';
  }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '26px', fontWeight: 'bold'}}>Em Breve</div>
  );
};