const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.6, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
] as const;

// https://stackoverflow.com/a/7128796/704681
export const getColorForPercentage = (percent: number): string => {
  let i = 0;
  for (i = 1; i < percentColors.length - 1; i++) {
    if (percent < percentColors[i].pct) {
      break;
    }
  }

  const lower = percentColors[i - 1];
  const upper = percentColors[i];
  const range = upper.pct - lower.pct;
  const rangePct = (percent - lower.pct) / range;
  const pctLower = 1 - rangePct;
  const pctUpper = rangePct;
  const color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };

  return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
};
