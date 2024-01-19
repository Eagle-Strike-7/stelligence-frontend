'use client';

import * as d3 from 'd3';
import { D3DragEvent, drag as d3drag } from 'd3';
import React, { useEffect, useRef } from 'react';

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

    useEffect(() => {
        if (ref.current) {
            const svg = d3.select(ref.current);
            const width = +svg.attr('width');
            const height = +svg.attr('height');

            // NOTE 기존 그래프 내용 클리어
            svg.selectAll('*').remove();

            // NOTE 줌 핸들러 생성
            const zoomHandler = d3
                .zoom<SVGSVGElement, unknown>()
                .on('zoom', event => {
                    svg.selectAll('g').attr('transform', event.transform);
                });

            // NOTE 드래그 기능을 위한 함수
            const drag = d3drag<SVGCircleElement, Node, unknown>()
                .on(
                    'start',
                    (
                        event: D3DragEvent<SVGCircleElement, Node, unknown>,
                        d,
                    ) => {
                        console.log(d);
                        if (!event.active)
                            simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    },
                )
                .on(
                    'drag',
                    (
                        event: D3DragEvent<SVGCircleElement, Node, unknown>,
                        d,
                    ) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    },
                )
                .on(
                    'end',
                    (
                        event: D3DragEvent<SVGCircleElement, Node, unknown>,
                        d,
                    ) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    },
                );

            // NOTE 색상 스케일 설정
            const color = d3.scaleOrdinal(d3.schemeCategory10);

            // NOTE 포스 시뮬레이션 설정
            const simulation = d3
                .forceSimulation(nodes as Node[]) // Node 타입으로 명시
                .force(
                    'link',
                    d3
                        .forceLink<Node, d3.SimulationLinkDatum<Node>>(links)
                        .id(d => {
                            return d.id;
                        }),
                )
                .force('charge', d3.forceManyBody())
                .force('center', d3.forceCenter(width / 2, height / 2));

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
                .selectAll<SVGCircleElement, Node>('circle') // 타입을 SVGCircleElement와 Node로 지정
                .data(nodes)
                .join('circle')
                .attr('r', 5)
                .attr('fill', d => {
                    return color(d.group);
                }) // 색상 적용
                .call(drag); // 드래그 동작 적용

            // NOTE 시뮬레이션 갱신 시 링크와 노드의 위치 업데이트
            simulation.on('tick', () => {
                link.attr('x1', d => {
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

                node.attr('cx', d => {
                    return d.x ?? 0;
                }).attr('cy', d => {
                    return d.y ?? 0;
                });
            });

            // NOTE SVG 요소에 줌 핸들러 적용
            svg.call(zoomHandler);
        }
    }, [nodes, links]);

    return <svg ref={ref} width={800} height={600} />;
};

export default ForceGraph;
