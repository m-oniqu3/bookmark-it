import { useEffect, useState } from "react";
import { addBookColors, addBookPalette } from "../store/features/colours/coloursSlice";
import { useAppDispatch } from "../store/hooks/hooks";

// @ts-expect-error - no types available
import ColorThief from "../../node_modules/colorthief/dist/color-thief.mjs";
import { rgbToHex } from "../components/utils/colorCodes";

function useBackground(id: string, url: string) {
  // const cachedColor = useAppSelector((state) => state.colours.bookColours[id]);
  // const cachedPalette = useAppSelector((state) => state.colours.bookPalette[id]);

  const [color, setColor] = useState("#f2f2f2");
  const [palette, setPalette] = useState<string[]>(["#f2f2f2"]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const colorThief = new ColorThief();
    const img = new Image();

    function updateColor(value = [242, 242, 242], palette = [[242, 242, 242]]) {
      const hex = rgbToHex(value[0], value[1], value[2]);
      setColor(hex);

      const paletteHex = palette.map((color: number[]) => rgbToHex(color[0], color[1], color[2])) as string[];
      setPalette(paletteHex);

      dispatch(addBookColors({ bookId: id, color: hex }));
      dispatch(addBookPalette({ bookId: id, palette: paletteHex }));
    }

    function queryColor() {
      const color = colorThief.getColor(img);
      const palette = colorThief.getPalette(img, 8);

      return updateColor(color, palette);
    }

    img.addEventListener("load", queryColor);

    img.addEventListener("error", () => updateColor());
    const imageURL = url;

    const googleProxyURL =
      "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

    img.crossOrigin = "Anonymous";
    img.src = googleProxyURL + encodeURIComponent(imageURL);

    //cleanup
    return () => {
      img.removeEventListener("load", queryColor);
      img.removeEventListener("error", () => updateColor());
    };
  }, [url, dispatch, id]);

  return { color, palette };
}

export default useBackground;
