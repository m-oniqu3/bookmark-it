import { ComponentType } from "react";

interface ColorExtractorProps {
  getColors: (colors: string[]) => void;
}

declare const ColorExtractor: ComponentType<ColorExtractorProps>;

export default ColorExtractor;
