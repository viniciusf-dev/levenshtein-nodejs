class LevenshteinCalculator {
    calculate(str1, str2) {
      const m = str1.length;
      const n = str2.length;
      
      if (m === 0) return n;
      if (n === 0) return m;
      
      const dp = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0));
      
      for (let i = 0; i <= m; i++) dp[i][0] = i;
      for (let j = 0; j <= n; j++) dp[0][j] = j;
      
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,        
            dp[i][j - 1] + 1,         
            dp[i - 1][j - 1] + cost    
          );
        }
      }
      
      return dp[m][n];
    }
  }
  
  module.exports = LevenshteinCalculator;