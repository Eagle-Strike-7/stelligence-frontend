import React, { useEffect, useRef } from 'react';
import { Application, Graphics } from 'pixi.js';
import {
  SimulationNodeDatum,
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
} from 'd3';
import { Graph, GraphLink, GraphNode } from '@/types/graph/GraphProps';

const PixiGraph = ({ nodes, links }: Graph) => {
  const pixiContainer = useRef(null);

  useEffect(() => {
    (async () => {
      // Create a new application
      const app = new Application();

      // Initialize the application
      await app.init({ resizeTo: window, background: 'transparent' });

      // Append the application canvas to the ref element instead of document.body
      document.body.appendChild(app.canvas);

      nodes.forEach(node => {
        const nodeGraphics = new Graphics();
        nodeGraphics.circle(0, 0, 10);
        nodeGraphics.fill('red');
        app.stage.addChild(nodeGraphics);
        node.graphics = nodeGraphics;
      });

      // 그래프 노드인지
      function isGraphNode(node: SimulationNodeDatum): node is GraphNode {
        return (node as GraphNode).id !== undefined;
      }

      const simulation = forceSimulation(nodes)
        .force(
          'link',
          forceLink(links).id(node => {
            if (isGraphNode(node)) {
              return node.id; // 여기서 node는 GraphNode로 안전하게 처리됩니다.
            }
            return ''; // 혹은 다른 적절한 기본값 반환
          }),
        )
        .force('charge', forceManyBody())
        .force(
          'center',
          forceCenter(app.screen.width / 2, app.screen.height / 2),
        );

      const linkGraphics = new Graphics();
      app.stage.addChild(linkGraphics);

      simulation.on('tick', () => {
        linkGraphics.clear();
        linkGraphics.removeChildren();
        links.forEach((link: GraphLink) => {
          if (
            // 이렇게 조건처리 해주는 거 맞나?
            link.source.x &&
            link.source.y &&
            link.target.x &&
            link.target.y
          ) {
            linkGraphics
              .moveTo(link.source.x, link.source.y)
              .lineTo(link.target.x, link.target.y)
              .stroke({ width: 1, color: 'black' })
              .fill({ color: 0x0a0a00, alpha: 0.5 });
          }
        });

        nodes.forEach(node => {
          if (node.graphics) {
            node.graphics.x = node.x ?? 0;
            node.graphics.y = node.y ?? 0;
          }
        });
      });

      // Remember to clean up and destroy the Pixi application when the component unmounts
      return () => {
        app.destroy(true, {
          children: true,
          texture: true,
        });
      };
    })();
  }, [nodes, links]);

  return <div ref={pixiContainer} />;
};

export default PixiGraph;
