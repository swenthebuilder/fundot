"use client";
import React, { lazy, Suspense, useState } from 'react';

const DynamicComponent = lazy(() => import('./papibase'));

export  function MyComponent() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(true)}>Load Component</button>
      {showComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicComponent />
        </Suspense>
      )}
    </div>
  );
}

