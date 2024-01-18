export function loadCSS(url) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

export function darkenColor(color, percent) {
  // Ensure the percent is between 0 and 100
  percent = Math.min(100, Math.max(0, percent));

  // Remove the '#' character if present
  color = color.replace("#", "");

  // Parse the color as an integer
  var num = parseInt(color, 16);

  // Calculate the darkened color components
  var R = (num >> 16) * (100 - percent) / 100;
  var G = ((num >> 8) & 0x00FF) * (100 - percent) / 100;
  var B = (num & 0x0000FF) * (100 - percent) / 100;

  // Ensure the values are within the 0-255 range
  R = Math.min(255, Math.max(0, R));
  G = Math.min(255, Math.max(0, G));
  B = Math.min(255, Math.max(0, B));

  // Convert the components back to a hexadecimal string
  var darkerColor = "#" + (1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1);

  // console.log('darker', darkerColor);
  return darkerColor;
}
