export const getLPSymbol = (token0Symbol: string, token1Symbol: string) => {
  if (token0Symbol === 'WTARA') {
    return `TARA-${token1Symbol} LP`
  }
  if (token1Symbol === 'WTARA') {
    return `${token0Symbol}-TARA LP`
  }
  return `${token0Symbol}-${token1Symbol} LP`
}
