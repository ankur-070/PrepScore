import { TIERS } from '../data/tierConfig.js'

export function getTier(score) {
  const found = TIERS.find((tier) => score >= tier.min && score <= tier.max)
  return found ?? TIERS[0]
}
