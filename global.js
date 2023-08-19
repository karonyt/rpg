let video = document.getElementById("background-video");
let muteButton = document.getElementById("mute-button");   

// windowの高さに応じてCSS変数に異なる値を設定する関数
function setWindowHeight() {
    const windowHeight = window.innerHeight;
    let adjustedHeight;
    if (window.innerWidth >= 1535) {
        // PCの場合
        adjustedHeight = windowHeight - 420;
    } else if (window.innerWidth >= 768) {
        //タブレットの場合
        adjustedHeight = windowHeight - 305;
    } else {
        // スマートフォンの場合
        adjustedHeight = windowHeight - 215;
    }
    document.documentElement.style.setProperty('--adjusted-window-height', `${adjustedHeight}px`);
}

// ページロード時とウィンドウサイズ変更時にsetWindowHeight関数を実行
window.addEventListener('load', setWindowHeight);
window.addEventListener('resize', setWindowHeight);

//スクロール時に実行
function onScroll() {
    const elements = document.querySelectorAll('.scroll-animate-element');
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // 要素が画面内に入ったらクラスを追加してアニメーションを付ける
        if (elementTop < windowHeight) {
            element.classList.add('fade-in');
        }
    });
}

// ページロード時に実行
window.addEventListener('load', function () {
    setWindowHeight(); // ウィンドウの高さを設定
    onScroll(); // スクロールアニメーションを適用
});

// ウィンドウのリサイズ時にも実行
window.addEventListener('resize', setWindowHeight);
window.addEventListener('scroll', onScroll);

//音楽のオンオフ切り替え
function toggleMute() {
    if (video.muted) {
        video.muted = false;
        muteButton.classList.remove("on");
        muteButton.classList.add("off");
        fadeInAudio();
    } else {
        video.muted = true;
        muteButton.classList.remove("off");
        muteButton.classList.add("on");
        fadeOutAudio();
        setTimeout(function() {
            video.muted = true;
        }, 1000); // フェードアウトが終わったら音声をミュート
    }
}

// 音声をフェードイン
function fadeInAudio() {
    let currentVolume = 0;
    video.volume = 0; // ミュートの場合はvolumeが0なので、一時的に設定
    video.muted = false; // フェードイン時にミュートを解除
    let fadeInterval = setInterval(function() {
        currentVolume += 0.1;
        if (currentVolume >= 0.9) {
            clearInterval(fadeInterval);
        }
        video.volume = currentVolume;
    }, 100);
}

// 音声をフェードアウト
function fadeOutAudio() {
    let currentVolume = 1;
    let fadeInterval = setInterval(function() {
        currentVolume -= 0.1;
        if (currentVolume <= 0.1) {
            clearInterval(fadeInterval);
        }
        video.volume = currentVolume;
    }, 100);
}
