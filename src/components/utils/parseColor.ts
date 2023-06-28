export function parseColor(color: string) {
  // Remove leading '#' if present
  if (color.charAt(0) === "#") {
    color = color.substr(1);
  }

  // Convert short color notation (e.g., '#abc') to full notation (e.g., '#aabbcc')
  if (color.length === 3) {
    color = color
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Parse RGB values from color string
  const red = parseInt(color.substr(0, 2), 16);
  const green = parseInt(color.substr(2, 2), 16);
  const blue = parseInt(color.substr(4, 2), 16);

  return `${red}, ${green}, ${blue}`;
}
