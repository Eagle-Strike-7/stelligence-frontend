'use client';

import * as d3 from 'd3';
import { drag as d3drag } from 'd3';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import '../../../styles/graph.module.css';
import { Graph, GraphNode } from '@/types/graph/GraphProps';

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

      // NOTE 줌 핸들러 정의
      const zoomHandler = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 7])
        .on('zoom', event => {
          // NOTE 줌 변환 적용
          svg
            .selectAll('g')
            .transition()
            .duration(400)
            .ease(d3.easeQuadOut)
            .attr('transform', event.transform);

          // NOTE 현재 줌 스케일에 따라 텍스트 크기 조정
          const currentZoom = event.transform.k;
          let fontSize = 0;
          if (currentZoom >= 1.5 && currentZoom < 4) {
            fontSize = currentZoom * 2.2;
          } else if (currentZoom > 4) {
            fontSize = 1;
          }

          svg.selectAll('text').style('font-size', `${fontSize}px`);
        });

      svg.call(zoomHandler);

      const initialZoom = d3.zoomIdentity.scale(1); // 초기 줌 레벨 1로 설정

      // NOTE 드래그 기능을 위한 함수
      const drag = d3drag<SVGCircleElement, GraphNode, unknown>()
        .on('start', () => {})
        .on('drag', () => {})
        .on('end', () => {});

      // NOTE 색상 스케일 설정
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // NOTE 포스 시뮬레이션 설정
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3.forceLink(links).id((d: d3.SimulationNodeDatum) => {
            if ('id' in d) {
              return (d as GraphNode).id;
            }
            return '';
          }),
        )
        // NOTE 노드들을 밀어내는 힘
        .force('charge', d3.forceManyBody().strength(-50))
        // NOTE 원형으로 퍼지게 하는 힘
        .force('radial', d3.forceRadial(10, centerX, centerY));

      // NOTE 링크와 노드 요소 추가
      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line');

      const node = svg
        .append('g')
        .selectAll<SVGCircleElement, GraphNode>('circle')
        .data(nodes)
        .join('circle')
        .attr('class', d => {
          return searchResults.includes(d.id) ? 'blinking-node' : '';
        })
        .attr('r', 3)
        .attr('fill', d => {
          return color(d.group);
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
        .attr('y', (d: GraphNode) => {
          return (d.y ?? 0) + 15;
        })
        .text(d => {
          return d.title;
        })
        .style('font-size', '0.3rem')
        .style('fill', 'white')
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
          .attr('cx', (d: GraphNode) => {
            return d.x ?? 0;
          })
          .attr('cy', (d: GraphNode) => {
            return d.y ?? 0;
          });

        nodeText
          .attr('x', (d: GraphNode) => {
            return d.x ?? 0;
          })
          .attr('y', (d: GraphNode) => {
            return (d.y ?? 0) + 15;
          });
      });

      // NOTE SVG 요소에 줌 핸들러 적용
      svg.call(zoomHandler.transform, initialZoom);
    }
  }, [nodes, links, router, searchResults]);

  return <svg ref={ref} width={800} height={600} />;
};

export default ForceGraph;
