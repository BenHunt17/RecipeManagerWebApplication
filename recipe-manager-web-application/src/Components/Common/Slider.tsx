import styled from "@emotion/styled";
import { useState } from "react";
import { FlexContainer } from "./StyledComponents/ShortcutComponents";

const SliderContainer = styled.div`
  position: relative;
  width: 500px;
  overflow-x: hidden;
`;

const SlideIndexLight = styled.div(
  ({ illuminated }: { illuminated: boolean }) => `
    width: 5px;
    height: 5px;
    background-color: ${illuminated ? "#425EEC" : "#93A2EC"};
    border-radius: 50%;
`
);

const ArrowButton = styled.button(
  ({ disabled }: { disabled: boolean }) => `
  color: var(--colour-text);
  opacity: ${disabled ? "0.5" : "1"};`
);

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Arrow = styled.span`
  font-size: 20px;
  color: var(--colour-primary);
`;

const Frame = styled.div(
  ({ translationX }: { translationX: number }) => `
  position: absolute;
  width: 500px;
  transform: translateX(${translationX}%);
  transition: transform 0.4s;
`
);

function getFrameTranslation(index: number, currentSlide: number) {
  //If slide is at the index then it shouldn't be translated. If it is more then translate off screen to right, else to left
  if (index === currentSlide) return 0;
  if (index > currentSlide) return 150;
  return -150;
}

export default function Slider({ slides }: { slides: JSX.Element[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const nextSlide = () => {
    if (currentSlide < slidesCount - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <SliderContainer>
      {slides.map((slide, index) => (
        <Frame
          key={slide.key ?? `slider.slide-${index}`}
          translationX={getFrameTranslation(index, currentSlide)}
        >
          {slide}
        </Frame>
      ))}
      <FlexContainer
        direction="row"
        justifyContent="center"
        gap={10}
        margin="100% 0 25px 0"
      >
        {new Array(slidesCount).fill(0).map((_, slideIndex) => (
          <SlideIndexLight
            key={`create-ingredient-form.slides.slideIndex.${slideIndex}`}
            illuminated={slideIndex === currentSlide}
          />
        ))}
      </FlexContainer>
      <FlexContainer direction="row" justifyContent="space-between">
        <ArrowButton
          type="button"
          onClick={previousSlide}
          disabled={currentSlide === 0}
        >
          <ButtonContent>
            <Arrow style={{ color: "var(--colour-primary)" }}>🢀</Arrow>
            Previous Slide
          </ButtonContent>
        </ArrowButton>
        <ArrowButton
          type="button"
          onClick={nextSlide}
          disabled={currentSlide === slidesCount - 1}
        >
          <ButtonContent>
            Next Slide
            <Arrow>🢂</Arrow>
          </ButtonContent>
        </ArrowButton>
      </FlexContainer>
    </SliderContainer>
  );
}
