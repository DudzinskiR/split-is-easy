import React, { useEffect, useRef } from "react";
import { useMousePosition } from "src/hooks/mouse-position/mouse-position";
import { useRefHeight } from "src/hooks/ref-height/ref-height.hook";
import { rgbaToHex } from "src/utils/helpers/rgba-to-hex/rgba-to-hex";
import { Vector2 } from "src/utils/math/vector/vector-2";

interface GridCursorOverlayProps {
  radius?: number;
  gridDensity?: number;
  gridLineWidth?: number;
}

let imageData: ImageData;
let imageBuffer: Uint32Array;

export const GridCursorOverlay = React.memo(
  ({
    radius = 80,
    gridDensity = 20,
    gridLineWidth = 2,
  }: GridCursorOverlayProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { mousePosition, ref: mousePositionRef } = useMousePosition();
    const { ref, height, width } = useRefHeight();
    useEffect(() => {
      if (!canvasRef.current) return;
      if (!width && !height) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      if (
        !imageData ||
        imageData.height !== height ||
        imageData.width !== width
      ) {
        imageData = ctx.createImageData(width, height);
        imageBuffer = new Uint32Array(imageData.data.buffer);
      }

      new Uint32Array(imageData.data.buffer).fill(0);

      if (!mousePosition) {
        ctx.putImageData(imageData, 0, 0);
        return;
      }

      for (
        let x = mousePosition.x - radius;
        x < mousePosition.x + radius;
        x++
      ) {
        for (
          let y = mousePosition.y - radius;
          y < mousePosition.y + radius;
          y++
        ) {
          if (
            x % gridDensity < gridLineWidth ||
            y % gridDensity < gridLineWidth
          ) {
            if (
              x < gridLineWidth ||
              x > width ||
              y < gridLineWidth ||
              y > height
            )
              continue;
            if (Math.hypot(x - mousePosition.x, y - mousePosition.y) < radius) {
              imageBuffer[y * width + x] = rgbaToHex(
                255,
                255,
                255,
                getPixelOpacity(mousePosition, new Vector2(x, y), 0.5)
              );
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height, mousePosition, width]);

    const getPixelOpacity = (
      cursor: Vector2,
      pixel: Vector2,
      opacity: number
    ) => {
      const distance = Math.hypot(pixel.x - cursor.x, pixel.y - cursor.y);

      return Math.round((1 - distance / radius) * 255 * opacity);
    };

    return (
      <div ref={mousePositionRef} className="absolute w-full h-full">
        <div ref={ref} className="absolute w-full h-full">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute w-full h-full"
          />
        </div>
      </div>
    );
  }
);
