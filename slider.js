// =========================================================
// ALTRES OBRES — CARRUSEL DE TRÀILERS
// =========================================================

window.addEventListener('DOMContentLoaded', function () {

    const slides = document.querySelectorAll(
        '.writer-trailer-slide'
    );

    const prevButton = document.querySelector(
        '.writer-trailer-prev'
    );

    const nextButton = document.querySelector(
        '.writer-trailer-next'
    );

    const dots = document.querySelectorAll(
        '.writer-trailer-dots button'
    );

    const carousel = document.querySelector(
        '.writer-trailer-carousel'
    );


    // =====================================================
    // SI EL CARRUSEL NO EXISTEIX, NO FEM RES
    // =====================================================

    if (!slides.length) {
        return;
    }


    let currentSlide = 0;

    let autoplay = null;

    let videoPlaying = false;


    // =====================================================
    // MOSTRAR DIAPOSITIVA
    // =====================================================

    function showSlide(index) {

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }


        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                'active',
                i === index
            );

        });


        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                'active',
                i === index
            );

        });


        currentSlide = index;

        videoPlaying = false;

    }


    // =====================================================
    // SEGÜENT
    // =====================================================

    function nextSlide() {

        showSlide(currentSlide + 1);

        restartAutoplay();

    }


    // =====================================================
    // ANTERIOR
    // =====================================================

    function previousSlide() {

        showSlide(currentSlide - 1);

        restartAutoplay();

    }


    // =====================================================
    // FLETXA DRETA
    // =====================================================

    if (nextButton) {

        nextButton.addEventListener(
            'click',
            function () {

                nextSlide();

            }
        );

    }


    // =====================================================
    // FLETXA ESQUERRA
    // =====================================================

    if (prevButton) {

        prevButton.addEventListener(
            'click',
            function () {

                previousSlide();

            }
        );

    }


    // =====================================================
    // PUNTS
    // =====================================================

    dots.forEach(function (dot, index) {

        dot.addEventListener(
            'click',
            function () {

                showSlide(index);

                restartAutoplay();

            }
        );

    });


    // =====================================================
    // AUTOPLAY
    // =====================================================

    function startAutoplay() {

        clearInterval(autoplay);


        autoplay = setInterval(
            function () {

                // Si hi ha un vídeo reproduint-se,
                // NO canviem de diapositiva.

                if (videoPlaying) {
                    return;
                }


                nextSlide();

            },
            15000
        );

    }


    // =====================================================
    // REINICIAR AUTOPLAY
    // =====================================================

    function restartAutoplay() {

        clearInterval(autoplay);

        startAutoplay();

    }


    // =====================================================
    // RATOLÍ SOBRE EL CARRUSEL
    // =====================================================

    if (carousel) {

        carousel.addEventListener(
            'mouseenter',
            function () {

                clearInterval(autoplay);

            }
        );


        carousel.addEventListener(
            'mouseleave',
            function () {

                if (!videoPlaying) {

                    restartAutoplay();

                }

            }
        );

    }


    // =====================================================
    // YOUTUBE IFRAME API
    // =====================================================

    function loadYouTubeAPI() {

        if (window.YT && window.YT.Player) {

            createYouTubePlayers();

            return;

        }


        const tag = document.createElement('script');

        tag.src =
            'https://www.youtube.com/iframe_api';

        const firstScriptTag =
            document.getElementsByTagName('script')[0];

        firstScriptTag.parentNode.insertBefore(
            tag,
            firstScriptTag
        );


        window.onYouTubeIframeAPIReady =
            function () {

                createYouTubePlayers();

            };

    }


    // =====================================================
    // CREAR REPRODUCTORS
    // =====================================================

    function createYouTubePlayers() {

        slides.forEach(function (slide) {

            const iframe =
                slide.querySelector(
                    'iframe'
                );


            if (!iframe) {
                return;
            }


            // Necessari perquè YouTube pugui
            // comunicar els esdeveniments amb la pàgina.

            iframe.src =
                iframe.src +
                (iframe.src.includes('?')
                    ? '&'
                    : '?') +
                'enablejsapi=1';


            new YT.Player(
                iframe,
                {

                    events: {

                        onStateChange:
                            function (event) {

                                handleVideoState(
                                    event
                                );

                            }

                    }

                }
            );

        });

    }


    // =====================================================
    // ESTAT DEL VÍDEO
    // =====================================================

    function handleVideoState(event) {

        /*
         * YT.PlayerState.PLAYING = 1
         * YT.PlayerState.ENDED   = 0
         */

        if (
            event.data ===
            YT.PlayerState.PLAYING
        ) {

            // El vídeo està reproduint-se.
            // Aturem completament l'autoplay.

            videoPlaying = true;

            clearInterval(autoplay);

        }


        else if (
            event.data ===
            YT.PlayerState.ENDED
        ) {

            // El vídeo ha acabat.
            // NO canviem automàticament.
            // La persona decideix què fer.

            videoPlaying = false;

            clearInterval(autoplay);

        }

    }


    // =====================================================
    // INICIALITZACIÓ
    // =====================================================

    showSlide(0);

    startAutoplay();

    loadYouTubeAPI();

});