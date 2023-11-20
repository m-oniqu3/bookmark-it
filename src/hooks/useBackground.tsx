import { useEffect, useState } from "react";
import { addBookColors } from "../store/features/colours/coloursSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";

// @ts-expect-error - no types available
import ColorThief from "../../node_modules/colorthief/dist/color-thief.mjs";

function useBackground(id: string, url: string) {
  const bookColor = useAppSelector((state) => state.colours.bookColours[id]) as string;
  const [color, setColor] = useState(bookColor || "#f2f2f2");
  const dispatch = useAppDispatch();

  useEffect(() => {
    function componentToHex(c: number) {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r: number, g: number, b: number) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    const colorThief = new ColorThief();
    const img = new Image();

    function updateColor(value = [242, 242, 242]) {
      const hex = rgbToHex(value[0], value[1], value[2]);
      setColor(hex);
      dispatch(addBookColors({ bookId: id, colors: hex }));
    }

    img.addEventListener("load", () => {
      const color = colorThief.getColor(img);
      updateColor(color);
    });

    img.addEventListener("error", () => updateColor());

    const imageURL = url ? url.replace(/^http:\/\//i, "https://") : url;
    const googleProxyURL =
      "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

    img.crossOrigin = "Anonymous";
    img.src = googleProxyURL + encodeURIComponent(imageURL);

    //cleanup
    return () => {
      img.removeEventListener("load", () => {
        const color = colorThief.getColor(img);
        updateColor(color);
      });

      img.removeEventListener("error", () => updateColor());
    };
  }, [url, dispatch, id]);

  return color;
}

export default useBackground;
