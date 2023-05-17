(function() {

    // JS loaded
    document.addEventListener("DOMContentLoaded", function(event) {

        let body = document.body;
        body.classList.add('loaded');


        let baseAudio = new Audio('assets/audio/1-base-scene.mp3'),
            transitiontoTime = new Audio('assets/audio/2-transition-to-time.mp3'),
            time = new Audio('assets/audio/3-time.mp3'),
            timeLine = new Audio('assets/audio/4-time-line.mp3'),
            storyOneBomb = new Audio('assets/audio/5-story-one-bomb.mp3'),
            storyOneBurn = new Audio('assets/audio/6-burning.mp3'),
            storyTwoStart = new Audio('assets/audio/7-story-two-start.mp3'),
            storyTwoBomb = new Audio('assets/audio/8-story-two-bomb.mp3'),
            btnClick = new Audio('assets/audio/button.mp3');


        baseAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

        time.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        storyOneBurn.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
       
       
        // Enter Website Loader
        let enterWebsite = document.querySelector('#enterWebsite');
        window.addEventListener("load", function() {
            enterWebsite.style.display = 'block';
            enterWebsite.onclick = () => {
                gsap.to("#loader", { yPercent: -100, duration: 1.6, ease: "Expo.easeOut" })
                baseAudio.play();
            }
        }, false);

        // Sound On btn lick
        let soundBtns = document.querySelectorAll('.btn-next');
        if (soundBtns) {
            soundBtns.forEach(link => {
                link.onclick = () => {
                    btnClick.play()
                }
            });
        }

        let screenWidth = window.innerWidth

        // Toggle Menu
        const toggleMenu = (toggleID, toggleNav) => {
            let toggleLink = document.querySelector(toggleID),
                toggleItem = document.querySelector(toggleNav),
                headerLinks = document.querySelectorAll("#toggleNav a"),
                root = document.getElementsByTagName('html')[0];
            headerLinks.forEach(link => {
                link.onclick = (e) => {
                    root.classList.remove('hide-scroll');
                    toggleItem.classList.remove("active");
                }
            });
            if (toggleLink && toggleItem) {
                toggleLink.onclick = () => {
                    if (toggleItem.classList.contains('active')) {
                        root.classList.remove('hide-scroll');
                        toggleItem.classList.remove("active");
                    } else {
                        root.classList.add('hide-scroll');
                        toggleItem.classList.add("active");
                    }
                }
            }
        }
        toggleMenu('#toggleBtn', '#toggleNav');


        let animating;
        Observer.create({
            target: ".base-section",
            type: "wheel,touch",
            tolerance: 10,
            preventDefault: true,
            wheelSpeed: -1,
            onUp: () => !animating && toTimeFromTop(),
        });

        gsap.set(".time-section", { autoAlpha: 0 });
        gsap.set(".derp-cockpit", { yPercent: 100 });

        function toTimeFromTop() {
            animating = true;
            baseAudio.pause()
            transitiontoTime.play();
            setTimeout(() => {
                transitiontoTime.pause();
                time.play()
                timeLine.play()
            }, 1000);
            let tl = gsap.timeline({
                onComplete: () => animating = false
            });

            tl.fromTo(".base-section .overlay", { yPercent: 0 }, { yPercent: -100, duration: 1, ease: "Power4.out" }, 'start')
                .fromTo(".time-section", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, delay: 1, ease: "Power4.out" }, 'start')
                .fromTo(".story-one-body", { yPercent: 100 }, { yPercent: 0, duration: 1.2, delay: 0.5, ease: Elastic.easeInOut.config(1, 0.85) }, 'start')
                .fromTo(".base-cockpit", { yPercent: 0 }, { yPercent: 100, duration: 1, delay: 0.8, ease: "Power4.out" }, 'start')
                .fromTo(".cloud-shade", { yPercent: 100 }, { yPercent: 0, duration: 1.2, delay: 1, ease: Elastic.easeInOut.config(1, 1) }, 'start')
                .fromTo(".cloud-shade-left", { xPercent: -120 }, { xPercent: -50, duration: 1.2, delay: 1, ease: Elastic.easeInOut.config(1, 1) }, 'start')
                .fromTo(".cloud-shade-right", { yPercent: 100 }, { yPercent: 0, duration: 1.2, delay: 1, ease: Elastic.easeInOut.config(1, 1) }, 'start')
                .fromTo(".base-section", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1.2, ease: "Power4.out" }, 'start')
        }

        Observer.create({
            target: ".story-one",
            type: "wheel,touch",
            tolerance: 10,
            preventDefault: true,
            wheelSpeed: -1,
            onUp: () => !animating && toStoryOneFromTop(),
            onDown: () => !animating && toBaseFromBottom(),
        });


        function toStoryOneFromTop() {
            animating = true;
            storyOneBomb.play()
            storyOneBurn.play()
            let tl = gsap.timeline({
                onComplete: () => animating = false
            });


            tl.fromTo(".story-two", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, delay: 0, ease: "Power4.out" }, 'second')
                .fromTo(".cloud-shade", { yPercent: 0 }, { yPercent: -10, duration: 0.7, delay: 0, ease: "Power4.out" }, 'second')
                .fromTo(".cloud-shade-left", { xPercent: -50, yPercent: 0 }, { xPercent: -100, yPercent: -50, duration: 0.7, delay: 0, ease: "Power4.out" }, 'second')
                .fromTo(".cloud-shade-right", { xPercent: 50, yPercent: 0 }, { xPercent: 40, yPercent: -60, duration: 0.7, delay: 0, ease: "Power4.out" }, 'second')
                .fromTo(".story-one-body", { yPercent: 0 }, { yPercent: -100, duration: 0.4, delay: 0, ease: "Power4.out" }, 'second')
                .fromTo(".story-two .meteor", { yPercent: 0 }, { yPercent: 40, duration: 0.7, delay: 0.4, ease: "Power4.out" }, 'second')
                .fromTo(".story-two .text", { yPercent: 400 }, { yPercent: 0, duration: 0.8, delay: 0, ease: "Power4.out" }, 'second');
        }

        function toBaseFromBottom() {
            animating = true;
            time.pause()
            timeLine.play()
            setTimeout(() => {
                transitiontoTime.play();
            }, 1000);
            setTimeout(() => {
                baseAudio.play()
            }, 2000);


            let tl = gsap.timeline({
                onComplete: () => animating = false
            });

            tl.fromTo(".base-section", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "Power4.out" }, 'start')
                .fromTo(".cloud-shade-right", { yPercent: 0 }, { yPercent: 100, duration: 1.2, ease: Elastic.easeInOut.config(1, 1) }, 'start')
                .fromTo(".cloud-shade-left", { xPercent: -50 }, { xPercent: -120, duration: 1.2, ease: Elastic.easeInOut.config(1, 1) }, 'start')
                .fromTo(".cloud-shade", { yPercent: 0 }, { yPercent: 100, duration: 1.2, ease: Elastic.easeInOut.config(1, 1) }, 'start')
                .fromTo(".base-cockpit", { yPercent: 100 }, { yPercent: 0, duration: 1, delay: 0.8, ease: "Power4.out" }, 'start')
                .fromTo(".story-one-body", { yPercent: 0 }, { yPercent: 100, duration: 1.2, delay: 0.5, ease: Elastic.easeInOut.config(1, 0.85) }, 'start')
                .fromTo(".time-section", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.7, delay: 1, ease: "Power4.out" }, 'start')
                .fromTo(".base-section .overlay", { yPercent: -100 }, { yPercent: 0, duration: 1, delay: 1.2, ease: "Power4.out" }, 'start')
        }

        Observer.create({
            target: ".story-two",
            type: "wheel,touch",
            tolerance: 10,
            preventDefault: true,
            wheelSpeed: -1,
            onUp: () => !animating && toEmbraceFromTop(),
            onDown: () => !animating && toStoryOneFromBottom(),
        });

        // const embraceVideoBtn = document.querySelector('#embraceVideoBtn');
        // embraceVideoBtn.addEventListener('click', function() {
        //     toEmbraceFromTop();
        // });

        function toEmbraceFromTop() {
            animating = true;
            time.pause()
            baseAudio.pause()
            storyOneBurn.pause()
            storyTwoStart.play()
            setTimeout(() => {
                storyTwoBomb.play()
            }, 1200);
            setTimeout(() => {
                document.getElementById('embraceVideo').play();
            }, 2200);
            

            let tl = gsap.timeline({
                onComplete: () => {
                    animating = false
                    initCarousel()
                }
            });

            tl.to(".story-two .text", { yPercent: -800, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
                .to(".story-two .meteor", { yPercent: 55, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
                .to(".story-two .forest", { yPercent: -45, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
                .to(".story-two .city", { yPercent: screenWidth < 992 ? -80 : -40, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
                .to(".story-two .city-back", { yPercent: -100, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
                .to(".story-two .pink-mountains", { yPercent: -40, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
                .to(".story-two .posterize", { yPercent: -140, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
                .to(".cloud-shade-left", { xPercent: -200, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
                .to(".cloud-shade-right", { xPercent: 100, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
                .to(".story-two .meteor", { yPercent: 75, duration: 0.7, delay: 1, ease: "Power4.out" }, 'third')
                .to(".story-two .pink-bomb", { yPercent: -114, scale: 2.4, duration: 1.5, delay: 1, ease: "Power4.out" }, 'third')
                .to(".story-two .pink-shade", { yPercent: -100, duration: 1.5, delay: 2, ease: "Power4.out" }, 'third')
                .to(".embrace-section", { display: "block", duration: 0.7, delay: 2.3, ease: "Power4.out" }, 'third')
                .to(".embrace-section", { autoAlpha: 1, duration: 0.7, delay: 2.8, ease: "Power4.out" }, 'third')
        }

        function toStoryOneFromBottom() {
            animating = true;
            storyOneBurn.pause()
            storyOneBomb.play()
            let tl = gsap.timeline({
                onComplete: () => animating = false
            });

            tl.fromTo(".story-two .text", { yPercent: 0 }, { yPercent: 400, duration: 0.8, delay: 0.2, ease: "Power4.out" }, 'second')
                .fromTo(".story-two .meteor", { yPercent: 40 }, { yPercent: 0, duration: 0.7, delay: 0, ease: "Power4.out" }, 'second')
                .fromTo(".story-one-body", { yPercent: -100 }, { yPercent: 0, duration: 0.4, delay: 0.2, ease: "Power4.out" }, 'second')
                .fromTo(".cloud-shade-right", { xPercent: 40, yPercent: -60 }, { xPercent: 50, yPercent: 0, duration: 0.7, delay: 0.2, ease: "Power4.out" }, 'second')
                .fromTo(".cloud-shade-left", { xPercent: -100, yPercent: -50 }, { xPercent: -50, yPercent: 0, duration: 0.7, delay: 0.2, ease: "Power4.out" }, 'second')
                .fromTo(".cloud-shade", { yPercent: -10 }, { yPercent: 0, duration: 0.7, delay: 0.2, ease: "Power4.out" }, 'second')
                .fromTo(".story-two", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.7, delay: 0.2, ease: "Power4.out" }, 'second')
        }

          function initCarousel() {
            if ($("#embraceCarousel").length > 0) {
                $("#embraceCarousel").carouselTicker({
                    direction: "prev",
                    speed: 2,
                });
            }
        }
 

        const embraceCockpit = document.querySelector('#embraceCockpit');
        embraceCockpit.addEventListener('click', function() {
            toStoryTwoFromBottom();
        });

        function toStoryTwoFromBottom() {
            document.getElementById('embraceVideo').pause();
            animating = true;
            storyTwoBomb.play()
            setTimeout(() => {
                storyTwoStart.play()
            }, 1200);
            setTimeout(() => {
                time.play()
                storyOneBurn.play()
            }, 2200);
            let tl = gsap.timeline({
                onComplete: () => animating = false
            });
            tl.to(".embrace-section", { autoAlpha: 0, duration: 0.7, delay: 0, ease: "Power4.out" }, 'seventh')
                .to(".embrace-section", { display: "none", duration: 0.7, delay: 0, ease: "Power4.out" }, 'seventh')
                .to(".story-two .pink-shade", { yPercent: 0, duration: 1.5, delay: 0.2, ease: "Power4.out" }, 'seventh')
                .to(".story-two .pink-bomb", { yPercent: 0, scale: 0, duration: 1.5, delay: 1.2, ease: "Power4.out" }, 'seventh')
                .to(".story-two .meteor", { yPercent: 55, duration: 0.7, delay: 1.2, ease: "Power4.out" }, 'seventh')
                .to(".cloud-shade-right", { xPercent: 40, duration: 0.7, delay: 2.2, ease: "Power4.out" }, 'seventh')
                .to(".cloud-shade-left", { xPercent: -100, duration: 0.7, delay: 2.2, ease: "Power4.out" }, 'seventh')
                .to(".story-two .posterize", { yPercent: 0, duration: 0.7, delay: 2.2, ease: "Power4.out" }, 'seventh')
                .to(".story-two .pink-mountains", { yPercent: 0, duration: 0.7, delay: 2.2, ease: "Power4.out" }, 'seventh')
                .to(".story-two .city-back", { yPercent: 0, duration: 0.7, delay: 2.2, ease: "Power4.out" }, 'seventh')
                .to(".story-two .city", { yPercent: 0, duration: 0.7, delay: 2.2, ease: "Power4.out" }, 'seventh')
                .to(".story-two .forest", { yPercent: 0, duration: 0.7, delay: 2.2, ease: "Power4.out" }, 'seventh')
                .to(".story-two .meteor", { yPercent: 40, duration: 0.7, delay: 2.2, ease: "Power4.out" }, 'seventh')
                .to(".story-two .text", { yPercent: 0, duration: 0.7, delay: 2.2, ease: "Power4.out" }, 'seventh')
        }


        function redirectToTwitter() {
            // Text to be added to the new tweet
            const tweetText = 'GET $DERPY WITH ME IN THE #DERPYWORLD @thederpycoin';
          
            // Encode the tweet text for URL
            const encodedText = encodeURIComponent(tweetText);
          
            // Construct the Twitter URL with the pre-filled text
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
          
            // Open the Twitter URL in a new window or tab
            window.open(twitterUrl);
          }

          const tweetButton = document.getElementById('tweetButton'); 
          tweetButton.addEventListener('click', redirectToTwitter);


       

        // function toEmbraceFromButton() {
        //     animating = true;
        //     baseAudio.pause()
        //     time.pause()
        //     storyOneBurn.pause()
        //     setTimeout(() => {
        //         document.getElementById('embraceVideo').play();
        //     }, 1200);
            
        //     let tl = gsap.timeline({
        //         onComplete: () => {
        //             animating = false
        //             initCarousel()
        //         }
        //     });

        //     tl.to(".story-two .text", { yPercent: -800, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
        //         .to(".story-two .meteor", { yPercent: 55, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
        //         .to(".story-two .forest", { yPercent: -45, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
        //         .to(".story-two .city", { yPercent: screenWidth < 992 ? -80 : -40, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
        //         .to(".story-two .city-back", { yPercent: -100, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
        //         .to(".story-two .pink-mountains", { yPercent: -40, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
        //         .to(".story-two .posterize", { yPercent: -140, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
        //         .to(".cloud-shade-left", { xPercent: -200, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
        //         .to(".cloud-shade-right", { xPercent: 100, duration: 0.7, delay: 0, ease: "Power4.out" }, 'third')
        //         .to(".story-two .meteor", { yPercent: 75, duration: 0.7, delay: 1, ease: "Power4.out" }, 'third')
        //         .to(".story-two .pink-bomb", { yPercent: -114, scale: 2.4, duration: 1.5, delay: 1, ease: "Power4.out" }, 'third')
        //         .to(".story-two .pink-shade", { yPercent: -100, duration: 1.5, delay: 2, ease: "Power4.out" }, 'third')
        //         .to(".embrace-section", { display: "block", duration: 0.7, delay: 2.3, ease: "Power4.out" }, 'third')
        //         .to(".embrace-section", { autoAlpha: 1, duration: 0.7, delay: 2.8, ease: "Power4.out" }, 'third')
        // }

    });
     
})();