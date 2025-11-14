document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('similarity-form');
    const text1Input = document.getElementById('text1');
    const text2Input = document.getElementById('text2');
    const resultDisplay = document.getElementById('resultDisplay');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const text1 = text1Input.value;
        const text2 = text2Input.value;

        const similarity = calculateLevenshteinSimilarity(text1, text2);

        resultDisplay.textContent = `Podobieństwo: ${similarity.toFixed(2)}%`;
    });

    function calculateLevenshteinSimilarity(text1, text2) {
        const str1 = text1.toLowerCase();
        const str2 = text2.toLowerCase();

        const maxLength = Math.max(str1.length, str2.length);

        if (maxLength === 0) {
            return 100.00;
        }

        const distance = levenshteinDistance(str1, str2);

        const similarity = (1 - (distance / maxLength)) * 100;
        
        return similarity;
    }

    function levenshteinDistance(a, b) {
        const dp = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

        for (let i = 0; i <= b.length; i++) {
            dp[i][0] = i;
        }

        for (let j = 0; j <= a.length; j++) {
            dp[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                const cost = (a[j - 1] === b[i - 1]) ? 0 : 1;
                
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + cost
                );
            }
        }
        
        return dp[b.length][a.length];
    }
});