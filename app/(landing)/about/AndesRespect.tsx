"use client";

import { Graphics, Stage, useApp, useTick } from "@pixi/react";
import clsx from "clsx";
import { ComponentProps, useCallback, useReducer, useState } from "react";
import { useMeasure } from "react-use";

const Starfield = () => {
  const app = useApp();
  const [stars, reducer] = useReducer(
    (
      prev: {
        x: number;
        y: number;
        z: number;
        color: { h: number; s: number; l: number };
      }[],
      data: { type: "update"; delta: number }
    ) => {
      switch (data.type) {
        case "update": {
          return prev.map((star) => {
            star.x += 0.0005 * Math.pow(star.z, 2) * data.delta;
            if (1 < star.x) star.x = 0;
            return star;
          });
        }
      }
    },
    [...new Array(1000)].map(() => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.25 + Math.random() * 0.75,
      color: {
        h: Math.random() * 40 + 170,
        s: Math.random() * 30 + 60,
        l: Math.random() * 15 + 85,
      },
    }))
  );

  useTick((delta) => {
    reducer({ type: "update", delta });
  });
  const draw = useCallback<
    Exclude<ComponentProps<typeof Graphics>["draw"], undefined>
  >(
    (g) => {
      g.clear();
      g.lineStyle(0);
      for (const star of stars) {
        g.beginFill(
          star.color,
          Math.sqrt(star.z) * 0.35 * Math.pow(Math.sin(star.x * Math.PI), 0.5)
        )
          .drawCircle(
            app.screen.width * star.x,
            app.screen.height * star.y,
            Math.pow(star.z, 2) * 2
          )
          .endFill();
      }
    },
    [app.screen.height, app.screen.width, stars]
  );

  return <Graphics draw={draw} />;
};

const Frames: { dx: number; dy: number; F: number }[] = [
  { dx: -0.0125, dy: 0, F: 10 },
  { dx: -0.0125, dy: 0, F: 10 }, // 0:19
  { dx: -0.0125, dy: 0, F: 5 }, // 0:24
  { dx: -0.0125, dy: 0, F: 5 }, // 0:30
  { dx: -0.0125, dy: 0, F: 10 }, // 1:10
  { dx: -0.0125, dy: 0, F: 5 }, // 1:15
  { dx: -0.0125, dy: 0, F: 10 }, // 1:25
  { dx: -0.0125, dy: 0, F: 5 }, // 1:30
  { dx: -0.0125, dy: 0, F: 6 }, // 2:06
  { dx: -0.0125, dy: 0, F: 5 }, // 2:11
  { dx: -0.02, dy: 0, F: 5 }, // 2:16
  { dx: -0.02, dy: 0, F: 5 }, // 2:21
  { dx: -0.02, dy: 0, F: 5 }, // 2:26
  { dx: -0.02, dy: 0, F: 5 }, // 3:01
  { dx: -0.02, dy: 0, F: 5 }, // 3:06
  { dx: -0.02, dy: 0, F: 11 }, // 3:17
  { dx: -0.01, dy: 0, F: 5 }, // 3:22
  { dx: -0.01, dy: 0, F: 5 }, // 3:27
  { dx: -0.0125, dy: 0, F: 4 }, // 4:01
  { dx: -0.0125, dy: 0, F: 7 }, // 4:08
  { dx: -0.0125, dy: 0, F: 20 }, // 4:28
  { dx: -0.0125, dy: 0, F: 5 }, // 5:03
  { dx: -0.0125, dy: 0, F: 5 }, // 5:08
  { dx: -0.0125, dy: 0, F: 10 }, // 5:18
  { dx: -0.0125, dy: 0, F: 6 }, // 5:24
  { dx: -0.0125, dy: 0, F: 5 }, // 5:29
  { dx: -0.0125, dy: 0, F: 5 }, // 6:04
  { dx: -0.0125, dy: 0, F: 5 }, // 6:09
  { dx: -0.0125, dy: 0, F: 10 }, // 6:19
  { dx: -0.0125, dy: 0, F: 11 }, // 6:30
  { dx: -0.0125, dy: 0, F: 5 }, // 7:05
  { dx: -0.0125, dy: 0, F: 5 }, // 7:10
  { dx: -0.0125, dy: 0, F: 5 }, // 7:15
  { dx: -0.0125, dy: 0, F: 5 }, // 7:20
  { dx: 0.03, dy: 0, F: 57 }, // 9:17
  { dx: -0.0125, dy: -0.5, F: 4 }, // 9:22
  { dx: -0.0125, dy: -0.5, F: 5 }, // 9:27
  { dx: -0.0125, dy: -0.5, F: 5 }, // 10:02
  { dx: -0.0125, dy: 0.5, F: 5 }, // 10:07
  { dx: -0.0125, dy: 0.5, F: 5 }, // 10:12
  { dx: -0.0125, dy: 0.5, F: 5 }, // 10:19
  { dx: 0.03, dy: 0, F: 9 }, // 10:28
  { dx: -0.0125, dy: 0, F: 10 }, // 11:08
  { dx: -0.0125, dy: 0, F: 10 }, // 11:18
  { dx: -0.0125, dy: 0, F: 11 }, // 11:29
  { dx: -0.0125, dy: 0, F: 10 }, // 12:09
  { dx: -0.0125, dy: 0, F: 5 }, // 12:14
  { dx: -0.0125, dy: 0, F: 10 }, // 12:24
  { dx: -0.0125, dy: 0, F: 5 }, // 12:29
  { dx: -0.02, dy: 0, F: 6 }, // 13:05
  { dx: -0.02, dy: 0, F: 5 }, // 13:10
  { dx: -0.02, dy: 0, F: 5 }, // 13:15
  { dx: -0.02, dy: 0, F: 5 }, // 13:20
  { dx: -0.02, dy: 0, F: 5 }, // 13:25
  { dx: -0.02, dy: 0, F: 5 }, // 13:30
  { dx: -0.02, dy: 0, F: 5 }, // 14:05
  { dx: -0.02, dy: 0, F: 6 }, // 14:11
  { dx: -0.02, dy: 0, F: 5 }, // 14:16
  { dx: -0.02, dy: 0, F: 5 }, // 14:21
  { dx: -0.01, dy: 0, F: 5 }, // 14:26
  { dx: -0.01, dy: 0, F: 5 }, // 15:01
  { dx: -0.0125, dy: 0, F: 5 }, // 15:06
  { dx: 0, dy: -1.3, F: 11 }, // 15:17
  { dx: 0, dy: 0.5, F: 5 }, // 15:22
  { dx: 0, dy: 0.5, F: 5 }, // 15:22
  { dx: 0, dy: 0.5, F: 5 }, // 15:27
  { dx: -0.04, dy: -0.2, F: 5 }, // 16:02
  { dx: -0.0125, dy: 0, F: 5 }, // 16:07
  { dx: -0.0125, dy: 0, F: 10 }, // 16:17
  { dx: -0.0125, dy: 0, F: 6 }, // 16:23
  { dx: -0.0125, dy: 0, F: 5 }, // 16:28
  { dx: -0.0125, dy: 0, F: 10 }, // 17:08
  { dx: -0.0125, dy: 0, F: 5 }, // 17:13
  { dx: -0.02, dy: 0, F: 10 }, // 17:23
  { dx: -0.02, dy: 0, F: 11 }, // 18:04
  { dx: -0.0125, dy: 0, F: 5 }, // 18:09
  { dx: -0.0125, dy: 0, F: 5 }, // 18:14
  { dx: -0.0125, dy: 0, F: 5 }, // 18:19
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
  { dx: -0.025, dy: 0, F: 3 },
];
const totalF = Frames.reduce((prev, curr) => prev + curr.F, 0);
const WaitNext = 100;

const Anim = () => {
  const app = useApp();
  const [loop, setLoop] = useState<number>(0);

  useTick((delta) => {
    setLoop((prev) => (prev + delta * 0.5) % (totalF + WaitNext));
  });
  const draw = useCallback<
    Exclude<ComponentProps<typeof Graphics>["draw"], undefined>
  >(
    (g) => {
      g.clear();
      for (let i = 0; i < Frames.length; i++) {
        const startOn = Frames.slice(0, i + 1).reduce(
          (prev, curr) => prev + curr.F,
          0
        );
        if (startOn <= loop) {
          const dxInt =
            Frames.slice(0, i + 1).reduce((prev, curr) => prev + curr.dx, 0) *
            0.8;
          const dyInt = Frames.slice(0, i + 1).reduce(
            (prev, curr) => prev + curr.dy,
            0
          );
          const x =
            app.screen.width * (1 - i / Frames.length + loop / totalF + dxInt);
          const y = app.screen.height * 0.5 + dyInt * 70;
          g.beginFill(
            { h: (360 * (i / Frames.length) * 3) % 360, s: 75, l: 70 },
            1 - Math.max((loop - totalF) / WaitNext, 0)
          )
            .drawCircle(x, y, 50)
            .endFill();
        }
      }
    },
    [loop, app.screen.height, app.screen.width]
  );

  return <Graphics draw={draw} />;
};

export default function AndesSpace({
  className,
  style,
}: {
  className?: string;
  style: React.CSSProperties;
}) {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  return (
    <div className={clsx(className)} ref={ref} style={style}>
      <Stage
        width={width}
        height={height}
        options={{ width, height, backgroundAlpha: 0 }}
      >
        <Starfield />
        <Anim />
      </Stage>
    </div>
  );
}
