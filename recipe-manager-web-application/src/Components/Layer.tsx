import { Fragment, useContext, useEffect, useRef } from "react";
import { LayersContext } from "./LayersProvider";

export default function Layer({ children }: { children: React.ReactNode }) {
  const layerContext = useContext(LayersContext);
  const layerIndex = useRef<number>();

  useEffect(() => {
    layerIndex.current = layerContext?.addLayer(children);
    return () => {
      if (layerIndex.current != undefined) {
        layerContext?.removeLayer(layerIndex.current);
      }
    };
  }, []);

  return <Fragment />;
}
