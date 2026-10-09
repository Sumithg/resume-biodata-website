$(document).ready(function () {


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    $("#currentYear").text(
        new Date().getFullYear()
    );



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    $("#menuButton").on("click", function () {

        $(".main-nav").toggleClass(
            "mobile-open"
        );

    });


    $(".main-nav a").on("click", function () {

        $(".main-nav").removeClass(
            "mobile-open"
        );

    });



    /* =====================================================
       DARK MODE
    ===================================================== */

    const savedTheme =
        localStorage.getItem(
            "sumithWebsiteTheme"
        );


    if (savedTheme === "dark") {

        $("body").addClass("dark");

        $("#themeToggle").text("☀");

    }


    $("#themeToggle").on("click", function () {


        $("body").toggleClass("dark");


        if ($("body").hasClass("dark")) {

            $(this).text("☀");

            localStorage.setItem(
                "sumithWebsiteTheme",
                "dark"
            );

        }

        else {

            $(this).text("☼");

            localStorage.setItem(
                "sumithWebsiteTheme",
                "light"
            );

        }

    });



    /* =====================================================
       JQUERY HOVER EFFECT FOR NAVIGATION BLOCKS
    ===================================================== */

    $(".navigation-blocks a").hover(

        function () {

            $(this)
                .find("b")
                .stop(true)
                .animate(
                    {
                        marginLeft: "8px"
                    },
                    150
                );

        },

        function () {

            $(this)
                .find("b")
                .stop(true)
                .animate(
                    {
                        marginLeft: "0px"
                    },
                    150
                );

        }

    );



    /* =====================================================
       PAGE LOAD ANIMATION
    ===================================================== */

    $(".editorial-content, .focus-list article, .featured-project, .bio-block")
        .css({
            opacity: 0,
            transform: "translateY(15px)"
        })
        .each(function (index) {

            $(this)
                .delay(index * 80)
                .animate(
                    {
                        opacity: 1
                    },
                    450
                );

            $(this).css(
                "transform",
                "translateY(0)"
            );

        });



    /* =====================================================
       RESUME PRINT
    ===================================================== */

    $("#printResume").on("click", function () {

        window.print();

    });



    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const form =
        $("#contactForm");


    if (form.length) {


        /* Character counter */

        $("#message").on(
            "input",
            function () {

                let count =
                    $(this).val().length;


                if (count > 500) {

                    $(this).val(
                        $(this)
                            .val()
                            .substring(
                                0,
                                500
                            )
                    );

                    count = 500;

                }


                $("#charCount").text(
                    count + " / 500"
                );

            }
        );



        /* Error helper */

        function showError(
            field,
            errorField,
            message
        ) {

            $(field)
                .addClass("input-error");

            $(errorField)
                .text(message);

        }


        /* Clear errors */

        function clearErrors() {

            $(".form-error")
                .text("");

            $(
                "#name, " +
                "#email, " +
                "#phone, " +
                "#subject, " +
                "#message"
            )
                .removeClass(
                    "input-error"
                );

        }



        /* Submit */

        form.on(
            "submit",
            function (event) {

                event.preventDefault();


                clearErrors();


                $("#formSuccess")
                    .hide();


                const name =
                    $.trim(
                        $("#name").val()
                    );


                const email =
                    $.trim(
                        $("#email").val()
                    );


                const phone =
                    $.trim(
                        $("#phone").val()
                    );


                const subject =
                    $("#subject").val();


                const message =
                    $.trim(
                        $("#message").val()
                    );


                const agreement =
                    $("#agree").is(
                        ":checked"
                    );


                let valid =
                    true;



                /* NAME */

                if (
                    name.length < 3
                ) {

                    showError(
                        "#name",
                        "#nameError",
                        "Please enter at least 3 characters."
                    );

                    valid = false;

                }



                /* EMAIL */

                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailRegex.test(email)
                ) {

                    showError(
                        "#email",
                        "#emailError",
                        "Please enter a valid email address."
                    );

                    valid = false;

                }



                /* PHONE */

                if (
                    phone !== "" &&
                    !/^[0-9+\-\s]{10,15}$/.test(phone)
                ) {

                    showError(
                        "#phone",
                        "#phoneError",
                        "Please enter a valid phone number."
                    );

                    valid = false;

                }



                /* SUBJECT */

                if (
                    subject === ""
                ) {

                    showError(
                        "#subject",
                        "#subjectError",
                        "Please select a subject."
                    );

                    valid = false;

                }



                /* MESSAGE */

                if (
                    message.length < 10
                ) {

                    showError(
                        "#message",
                        "#messageError",
                        "Message must contain at least 10 characters."
                    );

                    valid = false;

                }



                /* AGREEMENT */

                if (!agreement) {

                    $("#agreeError")
                        .text(
                            "Please confirm the information."
                        );

                    valid = false;

                }



                /* SUCCESS */

                if (valid) {


                    $("#formSuccess")
                        .slideDown(300);


                    $("html, body")
                        .animate(
                            {
                                scrollTop:
                                    $("#formSuccess")
                                        .offset()
                                        .top - 150
                            },
                            500
                        );


                    setTimeout(
                        function () {

                            form[0].reset();

                            $("#charCount")
                                .text(
                                    "0 / 500"
                                );

                        },
                        1500
                    );

                }

            }
        );



        /* =================================================
           CLEAR INDIVIDUAL ERROR
        ================================================= */

        $(
            "#name, " +
            "#email, " +
            "#phone, " +
            "#subject, " +
            "#message"
        ).on(
            "input change",
            function () {

                $(this)
                    .removeClass(
                        "input-error"
                    );

            }
        );


        $("#agree").on(
            "change",
            function () {

                $("#agreeError")
                    .text("");

            }
        );

    }

});