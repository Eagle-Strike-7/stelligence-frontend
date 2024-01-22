'use client';

import * as d3 from 'd3';
import { drag as d3drag } from 'd3';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

interface Graph {
  nodes: Node[];
  links: Link[];
}

const ForceGraph = ({ nodes, links }: Graph) => {
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
      const onNodeClick = (event: MouseEvent, node: Node) => {
        router.push(`/stars/${node.id}`); // 클릭한 노드의 ID를 사용하여 URL 경로 이동
      };

      // NOTE 줌 핸들러 생성

      // REVIEW easeSinInOut, easeCubicOut,easeQuadInOut->가장 극적인 줌인 줌아웃 , easeQuadOut
      const zoomHandler = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([-10, 10]) // 스케일 범위 설정
        .on('zoom', event => {
          svg
            .selectAll('g')
            .transition()
            .duration(500)
            .ease(d3.easeQuadInOut)
            .attr('transform', event.transform);
        });

      // NOTE 드래그 기능을 위한 함수
      const drag = d3drag<SVGCircleElement, Node, unknown>()
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
          d3.forceLink(links).id(d => {
            return d.id;
          }),
        )
        // NOTE 노드들을 밀어내는 힘
        .force('charge', d3.forceManyBody().strength(-20)) // 0으로 설정하여 노드 간 상호작용 없음
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
        .selectAll<SVGCircleElement, Node>('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 4)
        .attr('fill', d => {
          return color(d.group);
        })
        .on('click', onNodeClick)
        .call(drag);

      // NOTE 시뮬레이션 갱신 시 링크와 노드의 위치 업데이트
      simulation.on('tick', () => {
        link
          .attr('x1', d => {
            return (d.source as Node).x ?? 0;
          })
          .attr('y1', d => {
            return (d.source as Node).y ?? 0;
          })
          .attr('x2', d => {
            return (d.target as Node).x ?? 0;
          })
          .attr('y2', d => {
            return (d.target as Node).y ?? 0;
          });

        node
          .attr('cx', d => {
            return d.x ?? 0;
          })
          .attr('cy', d => {
            return d.y ?? 0;
          });
      });

      // NOTE SVG 요소에 줌 핸들러 적용
      svg.call(zoomHandler);
    }
  }, [nodes, links, router]);

  return <svg ref={ref} width={800} height={600} />;
};

export default ForceGraph;
