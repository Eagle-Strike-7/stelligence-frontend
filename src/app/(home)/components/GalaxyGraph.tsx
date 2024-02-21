'use client';

import * as d3 from 'd3';
import { Simulation, drag as d3drag } from 'd3';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Graph, GraphLink, GraphNode } from '@/types/graph/GraphProps';
import styles from '../../../styles/graph.module.css';

interface GraphProps extends Graph {
  searchResults: string[];
  isSearchSuccess: boolean;
}

const ForceGraph = ({
  nodes,
  links,
  searchResults,
  isSearchSuccess,
}: GraphProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const router = useRouter();

  const handleNodeClick = (event: MouseEvent, node: GraphNode) => {
    router.push(`/stars/${node.id}`);
  };

  // NOTE 드래그 이벤트 핸들러
  const createDragHandler = (simulation: Simulation<GraphNode, GraphLink>) => {
    return d3drag<SVGCircleElement, GraphNode, unknown>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
  };

  // NOTE 포스 시뮬레이션 설정
  const createSimulation = (width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;

    return d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id(d => {
            return (d as GraphNode).id;
          })
          .distance(40)
          .strength(0.8),
      )
      .force('charge', d3.forceManyBody().strength(-80))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('collide', d3.forceCollide().radius(25))
      .force('radial', d3.forceRadial(0, centerX, centerY));
  };

  //  const debouncedSearchSuccess = useDebounce(isSearchSuccess, 1000);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);
      const width = +svg.attr('width');
      const height = +svg.attr('height');
      const centerX = width / 2;
      const centerY = height / 2;
      const starColors = [
        '#d6ad5c', // 노
        '#5c5cd6', // 남
        '#5cd65c', // 진초
        '#ad5cd6', // 보라
        '#547b87', // 청록
        '#d65c5c', // 주
        '#c1a0b2', // 연핑크
        '#e4e6e7', // 거의 흰색
        '#C79AE5', // 연핑크
        '#6495ed', // 하늘
        '#add65c', // 연초
        '#d65cd6', // 핑
      ];

      // NOTE 노드들을 원의 중심에서 시작하도록 초기 위치 설정
      nodes.forEach(node => {
        node.x = centerX;
        node.y = centerY;
      });

      // NOTE 기존 그래프 내용 클리어
      svg.selectAll('*').remove();

      // NOTE 색 및 그라데이션 설정
      const colorScale = d3.scaleOrdinal(starColors);
      const defs = svg.append('defs');

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

      const changeLinkColor = (link: any, color: string) => {
        link.style('stroke', color);
      };

      let isHovered = false;
      // NOTE 마우스 호버 시 동작하는 함수
      const handleMouseOver = (event: MouseEvent, hoveredNode: GraphNode) => {
        isHovered = true;
        node.style('opacity', 0.2);
        node
          .filter((node: GraphNode) => {
            return node.group === hoveredNode.group;
          })
          .style('opacity', 1);
        node
          .filter((d: GraphNode) => {
            return d.id === hoveredNode.id;
          })
          .transition('all 0.5 easeout')
          .attr('r', 5);

        link.attr('stroke-opacity', 0.5);

        const currentZoom = d3.zoomTransform(svg.node()!).k;
        nodeText
          .filter((node: GraphNode) => {
            return node.id === hoveredNode.id;
          })
          .transition('all 0.5 easeout')
          .ease(d3.easeQuadInOut)
          .style('font-size', d => {
            if (searchResults.includes(d.id)) {
              return '0.7rem';
            }
            return currentZoom < 1.5 ? '0.7rem' : '0.5rem';
          })
          .attr('y', d => {
            return currentZoom < 1.5 ? (d.y ?? 0) + 28 : (d.y ?? 0) + 20;
          });
        nodeText.style('fill', (d: GraphNode) => {
          return d.id === hoveredNode.id ? '#d9d9d9' : '#6B7280';
        });

        d3.select(event.target as SVGElement).style('cursor', 'pointer');
        const relatedLinks = link.filter((d: GraphLink) => {
          return (
            (d.source as GraphNode).group === hoveredNode.group &&
            (d.target as GraphNode).group === hoveredNode.group
          );
        });

        changeLinkColor(relatedLinks, '#5c5cd6');
        relatedLinks.classed(styles.flow, true);
      };

      // NOTE 마우스 호버 제거 시 동작하는 함수
      const handleMouseOut = (event: MouseEvent, hoveredNode: GraphNode) => {
        if (isHovered) {
          isHovered = false;
          node.style('opacity', 1);
          link.classed(styles.pulse, false);
          changeLinkColor(link, '#999');
          link.classed(styles.flow, false);

          node.transition().attr('r', 3);

          const currentZoom = d3.zoomTransform(svg.node()!).k;
          nodeText
            .filter((node: GraphNode) => {
              return node.id === hoveredNode.id;
            })
            .transition('')
            .ease(d3.easeQuadInOut)
            .style('font-size', d => {
              if (searchResults.includes(d.id)) {
                return '0.7rem'; // NOTE 검색 결과에 해당하는 노드는 항상 0.7rem
              }
              return currentZoom < 1.5 ? '0' : '0.5rem';
            })
            .attr('y', d => {
              if (searchResults.includes(d.id)) {
                return (d.y ?? 0) + 25;
              }

              return (d.y ?? 0) + 15;
            });

          nodeText.style('fill', '#d9d9d9');
        }
      };

      // NOTE 줌 핸들러 정의
      const zoomHandler = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 10])
        .on('zoom', event => {
          svg
            .selectAll('g')
            .transition('all 0.5 easeout')
            .duration(400)
            .ease(d3.easeQuadInOut)
            .attr('transform', event.transform);

          const currentZoom = event.transform.k;

          nodeText.transition().style('font-size', d => {
            if (searchResults.includes(d.id)) {
              return '0.9rem';
            }
            if (currentZoom < 1.5) {
              return '0';
            }
            return '0.5rem';
          });
        });

      const initialScale = 0.9;
      const translateX = centerX - centerX * initialScale;
      const translateY = centerY - centerY * initialScale;
      const initialZoom = d3.zoomIdentity
        .translate(translateX, translateY)
        .scale(initialScale);
      svg.call(zoomHandler);

      // NOTE 포스 시뮬레이션 설정
      const simulation = createSimulation(width, height);

      // NOTE 드래그 기능을 위한 함수
      const drag = createDragHandler(simulation);

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
        .attr('r', d => {
          return searchResults.includes(d.id) ? 6 : 3;
        })
        .attr('fill', d => {
          return colorScale(d.group);
        })
        .style('--original-color', d => {
          return colorScale(d.group);
        })
        .attr('fill', d => {
          return `url(#gradient-${starColors.indexOf(colorScale(d.group))})`;
        })
        .on('click', handleNodeClick)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
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
          return searchResults.includes(d.id)
            ? (d.y ?? 0) + 25
            : (d.y ?? 0) + 15;
        })
        .text(d => {
          return d.title;
        })
        .style('font-size', d => {
          return searchResults.includes(d.id) ? '0.7rem' : '0';
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
          .attr('x', d => {
            return d.x ?? 0;
          })
          .attr('y', d => {
            return searchResults.includes(d.id)
              ? (d.y ?? 0) + 25
              : (d.y ?? 0) + 15;
          });
      });

      // NOTE SVG 요소에 줌 핸들러 적용
      svg.call(zoomHandler.transform, initialZoom);
    }
  }, [router, isSearchSuccess]);

  return <svg ref={ref} width={1000} height={600} />;
};

export default ForceGraph;
