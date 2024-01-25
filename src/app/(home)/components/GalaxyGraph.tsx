'use client';

import * as d3 from 'd3';
import { drag as d3drag } from 'd3';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Graph, GraphNode } from '@/types/graph/GraphProps';
import styles from '../../../styles/graph.module.css';

interface GraphProps extends Graph {
  searchResults: string[];
}

const ForceGraph = ({ nodes, links, searchResults }: GraphProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);
      const width = +svg.attr('width');
      const height = +svg.attr('height');
      const centerX = width / 2;
      const centerY = height / 2;
      const starColors = [
        '#547b87',
        '#C79AE5',
        '#6495ed',
        '#c1a0b2',
        '#e4e6e7',
      ];

      // NOTE 노드들을 원의 중심에서 시작하도록 초기 위치 설정
      nodes.forEach(node => {
        node.x = centerX;
        node.y = centerY;
      });

      // NOTE 기존 그래프 내용 클리어
      svg.selectAll('*').remove();

      // NOTE 노드 클릭 이벤트
      const onNodeClick = (event: MouseEvent, node: GraphNode) => {
        router.push(`/stars/${node.id}`);
      };

      // NOTE 색상 스케일 설정
      const colorScale = d3.scaleOrdinal(starColors);

      // NOTE SVG 요소에 그라데이션 정의 추가
      const defs = svg.append('defs');

      // NOTE 각 색상에 대한 그라데이션 정의
      starColors.forEach((color, index) => {
        const gradientId = `gradient-${index}`;
        const gradient = defs
          .append('linearGradient')
          .attr('id', gradientId)
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '100%')
          .attr('y2', '100%');

        gradient
          .append('stop')
          .attr('offset', '0%')
          .attr('stop-color', d3.color(color)!.brighter(1).toString());

        gradient
          .append('stop')
          .attr('offset', '100%')
          .attr('stop-color', d3.color(color)!.darker(1).toString());
      });

      // NOTE 줌 핸들러 정의
      const zoomHandler = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 10]) // 스케일 범위 설정
        .on('zoom', event => {
          svg
            .selectAll('g')
            .transition()
            .duration(400)
            .ease(d3.easeQuadInOut)
            .attr('transform', event.transform);

          const currentZoom = event.transform.k;
          let fontSize: string | number;
          if (currentZoom < 2) {
            fontSize = '0';
          } else if (currentZoom >= 1.5 && currentZoom < 3) {
            fontSize = '0.4rem';
          } else {
            fontSize = '0.5rem';
          }
          nodeText.style('font-size', d => {
            return searchResults.includes(d.id) ? '1.5rem' : fontSize;
          });
        });

      const initialZoom = d3.zoomIdentity.translate(180, 100).scale(0.6);

      svg.call(zoomHandler);

      // NOTE 드래그 기능을 위한 함수
      const drag = d3drag<SVGCircleElement, GraphNode, unknown>()
        .on('start', () => {})
        .on('drag', () => {})
        .on('end', () => {});

      // NOTE 포스 시뮬레이션 설정
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(links)
            .id((d: d3.SimulationNodeDatum) => {
              if ('id' in d) {
                return (d as GraphNode).id;
              }
              return '';
            })
            .distance(30)
            .strength(1),
        )
        // NOTE 노드들을 밀어내는 힘
        .force('charge', d3.forceManyBody().strength(-50))
        // NOTE 원형으로 퍼지게 하는 힘
        .force('radial', d3.forceRadial(10, centerX, centerY));

      // NOTE 링크와 노드 요소 추가
      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.2)
        .selectAll('line')
        .data(links)
        .join('line');

      const node = svg
        .append('g')
        .selectAll<SVGCircleElement, GraphNode>('circle')
        .data(nodes)
        .join('circle')
        .attr('class', d => {
          return searchResults.includes(d.id) ? styles['blinking-node'] : '';
        })
        .attr('r', d => {return (searchResults.includes(d.id) ? 6 : 3)})
        .attr('fill', d => {
          return colorScale(d.group);
        })
        .style('--original-color', d => {return colorScale(d.group)})
        .attr('fill', d => {
          return `url(#gradient-${starColors.indexOf(colorScale(d.group))})`;
        })
        .on('click', onNodeClick)
        .call(drag);

      const nodeText = svg
        .append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('x', (d: GraphNode) => {
          return d.x ?? 0;
        })
        .attr('y', (d: GraphNode) =>
          {return searchResults.includes(d.id) ? (d.y ?? 0) + 25 : (d.y ?? 0) + 15},
        )
        .text(d => {
          return d.title;
        })
        .style('font-size', d => {
          return searchResults.includes(d.id) ? '1.2rem' : '0';
        })
        .style('fill', '#d9d9d9')
        .attr('text-anchor', 'middle');

      // NOTE 시뮬레이션 갱신 시 링크와 노드의 위치 업데이트
      simulation.on('tick', () => {
        link
          .attr('x1', d => {
            return (d.source as GraphNode).x ?? 0;
          })
          .attr('y1', d => {
            return (d.source as GraphNode).y ?? 0;
          })
          .attr('x2', d => {
            return (d.target as GraphNode).x ?? 0;
          })
          .attr('y2', d => {
            return (d.target as GraphNode).y ?? 0;
          });
        node
          .attr('cx', d => {
            return d.x ?? 0;
          })
          .attr('cy', d => {
            return d.y ?? 0;
          });

        nodeText
          .attr('x', d => {return d.x ?? 0})
          .attr('y', d =>
            {return searchResults.includes(d.id) ? (d.y ?? 0) + 25 : (d.y ?? 0) + 15},
          );
      });

      // NOTE SVG 요소에 줌 핸들러 적용
      svg.call(zoomHandler.transform, initialZoom);
    }
  }, [nodes, links, router, searchResults]);

  return <svg ref={ref} width={800} height={600} />;
};

export default ForceGraph;
