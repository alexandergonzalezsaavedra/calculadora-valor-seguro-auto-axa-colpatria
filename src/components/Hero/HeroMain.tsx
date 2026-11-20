import { ImgHeroMobile } from './ImgHero';
import TitleHero from './TitleHero';

/** Encabezado del hero. La imagen de escritorio (ImgHero) se posiciona desde App. */
const HeroMain = () => {
  return (
    <>
      <TitleHero />
      <ImgHeroMobile />
    </>
  );
};

export default HeroMain;
