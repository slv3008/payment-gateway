export function luhnCheck(num: string): boolean {
    const reversedNumArray = [...num].reverse().map(Number);
    const lastDigit = reversedNumArray.shift();
  
    const sum = reversedNumArray.reduce((acc, val, idx) => {
      if (idx % 2 === 0) {
        val *= 2;
        if (val > 9) {
          val -= 9;
        }
      }
      return acc + val;
    }, 0);
  
    return (sum + (lastDigit || 0)) % 10 === 0;
  }
  