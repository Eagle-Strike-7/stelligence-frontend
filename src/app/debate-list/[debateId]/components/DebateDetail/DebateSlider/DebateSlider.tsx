import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import MiddleTitle from '@/components/Common/Title/MiddleTitle';
import { Amendment } from '@/types/common/Amendment';
import styles from '@/styles/carousel.module.css';
import ReviseContent from '@/app/vote-list/[voteId]/components/ReviseContent';
import ReviseDescription from '@/components/ReviseDescription';
import { PrevButton, NextButton, DotButton } from './RouteButton';

interface AmendmentsProps {
  amendments: Amendment[];
}

const DebateSlider = ({ amendments }: AmendmentsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const onDotClick = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <>
      <div className="mt-10 mb-6">
        <MiddleTitle title="수정 요청 사항" color="white" />
        <div className="tiptap flex justify-between gap-5 text-primary-dark-500 my-4 ">
          <span className="font-bold text-lg w-1/2 text-center">수정 전</span>
          <span className="font-bold text-lg w-1/2 text-center">수정 후</span>
        </div>
      </div>
      <div className={`${styles.embla} w-full`}>
        <div
          ref={emblaRef}
          className={`${styles.embla__viewport} place-items-center`}
        >
          <div className={`${styles.embla__container}`}>
            {amendments.map(amendment => {
              return (
                <div
                  className={styles.embla__slide}
                  key={amendment.amendmentId}
                >
                  <div
                    className={`${styles.embla__slide__number} flex justify-end`}
                  />
                  <ReviseDescription
                    index={selectedIndex}
                    type={amendment.type}
                  />
                  <div className="tiptap flex flex-col md:flex-row justify-between gap-5 mt-3">
                    <div className="w-full md:w-1/2">
                      <ReviseContent
                        heading={amendment.targetSection.heading}
                        title={amendment.targetSection.title}
                        content={amendment.targetSection.content}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      {amendment.type === 'CREATE' && (
                        <ReviseContent
                          heading={amendment.targetSection.heading ?? ''}
                          title={amendment.targetSection.title}
                          content={amendment.targetSection.content}
                        />
                      )}
                      <ReviseContent
                        heading={
                          amendment.type === 'DELETE'
                            ? amendment.targetSection.heading ?? ''
                            : amendment.requestedSectionHeading ?? ''
                        }
                        title={
                          amendment.type === 'DELETE'
                            ? amendment.targetSection.title ?? ''
                            : amendment.requestedSectionTitle ?? ''
                        }
                        content={
                          amendment.type === 'DELETE'
                            ? amendment.targetSection.content ?? ''
                            : amendment.requestedSectionContent ?? ''
                        }
                        type={amendment.type}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${styles.embla__dots} place-items-center`}>
          {scrollSnaps.map((snap, index) => {
            return (
              <DotButton
                selected={index === selectedIndex}
                onClick={onDotClick}
                key={snap}
                index={index}
              />
            );
          })}
        </div>

        <PrevButton
          enabled={emblaApi?.canScrollPrev() ?? false}
          onClick={scrollPrev}
        />

        <NextButton
          enabled={emblaApi?.canScrollNext() ?? false}
          onClick={scrollNext}
        />
      </div>
    </>
  );
};

export default DebateSlider;
