document.addEventListener('DOMContentLoaded', () => {

    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const toggleIcon = document.getElementById('toggleIcon');
    const bodyElement = document.body;

    const imgLength = document.getElementById('img-length');
    const imgDigit = document.getElementById('img-digit');
    const imgUpper = document.getElementById('img-upper');
    const imgSpecial = document.getElementById('img-special');
    const imgRepeat = document.getElementById('img-repeat');
    const imgSequence = document.getElementById('img-sequence');

    const imgOk = 'img/ok.png';
    const imgWrong = 'img/wrong.png';

    passwordInput.addEventListener('input', checkPasswordStrength);

    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.src = 'img/eye_open.png';
        } else {
            passwordInput.type = 'password';
            toggleIcon.src = 'img/eye_closed.png';
        }
    });

    function checkPasswordStrength() {
        const password = passwordInput.value;
        let score = 0;

        const hasDigit = /\d/;
        const hasUpper = /[A-Z]/;
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        const hasRepeating = /(.)\1\1/;

        const isLengthMet = password.length >= 8;
        imgLength.src = isLengthMet ? imgOk : imgWrong;
        if (isLengthMet) score++;

        const isDigitMet = hasDigit.test(password);
        imgDigit.src = isDigitMet ? imgOk : imgWrong;
        if (isDigitMet) score++;

        const isUpperMet = hasUpper.test(password);
        imgUpper.src = isUpperMet ? imgOk : imgWrong;
        if (isUpperMet) score++;

        const isSpecialMet = hasSpecial.test(password);
        imgSpecial.src = isSpecialMet ? imgOk : imgWrong;
        if (isSpecialMet) score++;

        const isRepeatMet = !hasRepeating.test(password);
        imgRepeat.src = isRepeatMet ? imgOk : imgWrong;
        if (isRepeatMet) score++;

        const isSequenceMet = !hasSequence(password);
        imgSequence.src = isSequenceMet ? imgOk : imgWrong;
        if (isSequenceMet) score++;

        bodyElement.classList.remove('blur-weak', 'blur-medium', 'blur-strong');

        if (password.length === 0 || score < 3) {
            bodyElement.classList.add('blur-weak');
        } else if (score < 6) {
            bodyElement.classList.add('blur-medium');
        } else {
            bodyElement.classList.add('blur-strong');
        }
    }

    function hasSequence(str) {
        if (str.length < 3) return false;

        for (let i = 0; i < str.length - 2; i++) {
            const c1 = str.charCodeAt(i);
            const c2 = str.charCodeAt(i + 1);
            const c3 = str.charCodeAt(i + 2);

            if (c1 + 1 === c2 && c2 + 1 === c3) {
                if (c1 >= 48 && c1 <= 57 && c3 >= 48 && c3 <= 57) return true;
                if (c1 >= 97 && c1 <= 122 && c3 >= 97 && c3 <= 122) return true;
                if (c1 >= 65 && c1 <= 90 && c3 >= 65 && c3 <= 90) return true;
            }
        }
        return false;
    }

    checkPasswordStrength();
});