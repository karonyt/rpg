const video = document.getElementById("background-video");
const muteButton = document.getElementById("mute-button");
const elements = document.querySelectorAll('.scroll-animate-element');

// ウィンドウの高さに応じてCSS変数に異なる値を設定
function setWindowHeight() {
    const windowHeight = window.innerHeight;
    let adjustedHeight = windowHeight - (window.innerWidth >= 1535 ? 420 : window.innerWidth >= 768 ? 305 : 215);
    document.documentElement.style.setProperty('--adjusted-window-height', `${adjustedHeight}px`);
}

// スクロール時のアニメーション処理
function onScroll() {
    const windowHeight = window.innerHeight;
    elements.forEach(element => {
        if (element.getBoundingClientRect().top < windowHeight) {
            element.classList.add('fade-in');
        }
    });
}

// ミュートトグルの処理
function toggleMute() {
    const fadeInterval = setInterval(() => {
        video.volume = video.muted ? Math.min(video.volume + 0.1, 0.9) : Math.max(video.volume - 0.1, 0.1);
        if ((video.muted && video.volume >= 0.9) || (!video.muted && video.volume <= 0.1)) {
            clearInterval(fadeInterval);
            if (!video.muted) video.muted = true;
        }
    }, 100);

    muteButton.classList.toggle("on");
    muteButton.classList.toggle("off");

    if (!video.muted) fadeInAudio();
    else fadeOutAudio();
}

// 音声をフェードインする処理
function fadeInAudio() {
    video.muted = false;
    fadeAudio(0.9, true);
}

// 音声をフェードアウトする処理
function fadeOutAudio() {
    fadeAudio(0.1, false);
}

// 音声をフェードする共通処理
function fadeAudio(targetVolume, fadeIn) {
    const fadeInterval = setInterval(() => {
        const currentVolume = video.volume;
        if ((fadeIn && currentVolume >= targetVolume) || (!fadeIn && currentVolume <= targetVolume)) {
            clearInterval(fadeInterval);
        }
        video.volume = fadeIn ? currentVolume + 0.1 : currentVolume - 0.1;
    }, 100);
}

// ページの初期化処理
function initializePage() {
    setWindowHeight();
    onScroll();
    // ビデオがメタデータを読み込んだ後、音量を0に設定
    video.addEventListener('loadedmetadata', () => { video.volume = 0; });
    window.addEventListener('resize', setWindowHeight);
    window.addEventListener('scroll', onScroll);
}

// ページロード時の初期化
window.addEventListener('load', initializePage);
// ミュートボタンのクリックイベントにトグル処理を関連付け
muteButton.addEventListener('click', toggleMute);
