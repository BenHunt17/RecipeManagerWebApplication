import React, { createContext, Fragment, useState } from "react";

interface Layer {
  index: number;
  content: React.ReactNode;
}

interface LayersContextType {
  addLayer: (content: React.ReactNode) => number;
  removeLayer: (index: number) => void;
}

export const LayersContext = createContext<LayersContextType | undefined>(
  undefined
);

export default function LayersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [layers, setLayers] = useState<Layer[]>([]);

  return (
    <LayersContext.Provider
      value={{
        addLayer: (content: React.ReactNode) => {
          const newElementIndex = layers.length;
          setLayers([...layers, { index: newElementIndex, content: content }]);
          return newElementIndex;
        },
        removeLayer: (index: number) => {
          setLayers(layers.filter((layer) => layer.index !== index));
        },
      }}
    >
      <div>
        {children}
        {layers.map((layer) => (
          <Fragment key={layer.index}>{layer.content}</Fragment>
        ))}
      </div>
    </LayersContext.Provider>
  );
}
