
// Function to format balance from planck to DOT
export function formatBalance(planckBalance: bigint): string {
    // DOT has 10 decimal places
    const DOT_DECIMALS = 10
    // Convert from planck (smallest unit) to DOT
    const balance = Number(planckBalance) / Math.pow(10, DOT_DECIMALS)
    // Format to a maximum of 4 decimal places
    return balance.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 5
    })
}
export function formatBalancev2(balance: string): string {
    const DOT = BigInt(10_000_000_000) // 1 DOT = 10^10 Planck
    const balanceBigInt = BigInt(balance)
    const dotAmount = balanceBigInt / DOT
    const plancksRemainder = balanceBigInt % DOT
  
    return `${dotAmount.toString()}.${plancksRemainder.toString().padStart(10, '0')} DOT`
  }