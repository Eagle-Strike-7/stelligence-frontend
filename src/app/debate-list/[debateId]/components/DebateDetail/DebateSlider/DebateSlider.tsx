import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import StarContent from '@/app/stars/[starId]/components/StarContent';
import MiddleTitle from '@/components/Common/Title/MiddleTitle';
import { Amendment } from '@/types/common/Amendment';
import { Tag } from '@chakra-ui/react';
import styles from '@/styles/carousel.module.css';
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
      <div className="mt-10 my-5">
        <MiddleTitle title="수정 요청 사항" color="white" />
        <div className="tiptap flex justify-between gap-5 text-primary-dark-500 ">
          <p className="font-bold w-1/2 text-center mb-4 ">수정 전</p>
          <p className="font-bold w-1/2 text-center mb-4">수정 후</p>
        </div>
      </div>
      <div className={`${styles.embla} w-full`}>
        <Tag bg="primary.500" mb={3}>
          #{selectedIndex + 1}
        </Tag>
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
                  <div className="tiptap flex justify-between gap-5">
                    <div className="w-1/2">
                      <StarContent
                        content={`<b>${amendment.targetSection.title}</b> <br/> ${amendment.targetSection.content}`}
                      />
                    </div>
                    <div className="w-1/2">
                      <StarContent
                        content={`<b>${amendment.requestedSectionTitle}</b> <br/> ${amendment.requestedSectionContent}`}
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
