
        const loader =
            document.getElementById("loader-container");

        const website =
            document.getElementById("Navbar-nav");

        const progressBar =
            document.getElementById("progress-bar");

        const percentLabel =
            document.getElementById("percentage-label");

        const ariaTrack =
            document.getElementById("accessibility-track");

        let currentProgress = 0;

        function revealWorkSections() {
            const animatedItems = document.querySelectorAll("#Skill .skill-item, #projects .card");

            if (!("IntersectionObserver" in window)) {
                animatedItems.forEach(function (item) {
                    item.classList.add("is-visible");
                });
                return;
            }

            const workObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        workObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            animatedItems.forEach(function (item) {
                workObserver.observe(item);
            });
        }
        function revealAboutSection() {
            const aboutSection = document.getElementById("About");

            if (!aboutSection) {
                return;
            }

            aboutSection.classList.add("about-reveal-ready");

            if ("IntersectionObserver" in window) {
                const aboutObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            aboutSection.classList.add("is-visible");
                            aboutObserver.unobserve(aboutSection);
                        }
                    });
                }, { threshold: 0.2 });

                aboutObserver.observe(aboutSection);
            } else {
                aboutSection.classList.add("is-visible");
            }
        }

        function revealSupportingContent() {
            const motionItems = document.querySelectorAll(".motion-reveal");

            if (!("IntersectionObserver" in window)) {
                motionItems.forEach(function (item) {
                    item.classList.add("is-visible");
                });
                return;
            }

            const motionObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        motionObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            motionItems.forEach(function (item) {
                item.classList.add("motion-ready");
                motionObserver.observe(item);
            });
        }

        /* =========================
           START LOADING
        ========================== */

        const loading = setInterval(function () {

            currentProgress += 1;


            progressBar.style.transform =
                `scaleX(${currentProgress / 100})`;


            percentLabel.textContent =
                `${currentProgress}%`;


            ariaTrack.setAttribute(
                "aria-valuenow",
                currentProgress
            );


            /* =========================
               LOADING FINISHED
            ========================== */

            if (currentProgress >= 100) {

                clearInterval(loading);


                setTimeout(function () {

                    /* Fade out loader */

                    loader.style.opacity = "0";


                    setTimeout(function () {

                        /* Remove loader */

                        loader.style.display = "none";


                        /* Show website */

                        website.style.display = "block";
                        revealAboutSection();
                        revealWorkSections();
                        revealSupportingContent();

                    }, 500);


                }, 500);

            }

        }, 30);
