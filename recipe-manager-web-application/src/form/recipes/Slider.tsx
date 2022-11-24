import styled from "@emotion/styled";
import { useState } from "react";
import { IconButton } from "../../component/styled/buttons";
import { FlexContainer } from "../../component/styled/layouts";

const FRAME_HEIGHT = "55vh";

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

const Frame = styled.div`
  width: 100%;
  height: ${FRAME_HEIGHT};
`;

const FrameContent = styled.div(
  ({ translationX }: { translationX: number }) => `
  position: absolute;
  width: 100%;
  height: ${FRAME_HEIGHT};
  transform: translateX(${translationX}%);
  transition: transform 0.4s;
  overflow: auto;
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
      <Frame>
        {slides.map((slide, index) => (
          <FrameContent
            key={index}
            translationX={getFrameTranslation(index, currentSlide)}
          >
            {slide}
          </FrameContent>
        ))}
      </Frame>
      <FlexContainer
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        margin="25px 0 0 0"
      >
        <FlexContainer width={50} />
        <FlexContainer gap={10}>
          {new Array(slidesCount).fill(0).map((_, slideIndex) => (
            <SlideIndexLight
              key={`create-ingredient-form.slides.slideIndex.${slideIndex}`}
              illuminated={slideIndex === currentSlide}
            />
          ))}
        </FlexContainer>
        <FlexContainer width={50}>
          <IconButton type="button" onClick={previousSlide}>
            &lt;
          </IconButton>
          <IconButton type="button" onClick={nextSlide}>
            &gt;
          </IconButton>
        </FlexContainer>
      </FlexContainer>
    </SliderContainer>
  );
}
