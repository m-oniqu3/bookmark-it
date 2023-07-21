import React, { useEffect } from "react";

type Props = {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  closeElement: () => void;
};

const useDetectClick = (props: Props) => {
  const { ref, closeElement } = props;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event?.target)) {
        // Check if the click event target is inside the modal or its children
        const modalElement = document.getElementById("modal"); // Replace "modal" with the ID of your modal element
        if (!modalElement || !modalElement.contains(event?.target)) {
          closeElement();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, closeElement]);
};

export default useDetectClick;
