'use strict';

(function ($) {
    $(document).ready(function () {

        let alerts = {
                emptyUsername: 'Пожалуйста, введите логин..',
                yourPassword: 'Your password is ',
                emptyFields: 'Пожалуйста заполните все поля!!! ',
                noUsername: 'Такой Username не найден, поробуйте еще..',
                wrongPassword: 'Этот пароль неправильный.'
            },
            users = [{
                    name: localStorage.getItem('login'),
                    password: localStorage.getItem('password')
                },
                {
                    name: 'Admin',
                    password: '111'
                }
            ];
            // user = localStorage.getItem('login'),
            // userPassword = localStorage.getItem('password');


        // Show password
        // $('.login__show-pass').click(function () {
        //     let field = $(this).parents('.login__block').find('.login__field');

        //     field.attr('type', 'text');

        //     setTimeout(() => {
        //         field.attr('type', 'password');
        //     }, 1000);
        // });

        // Forget your password
        // $('.login__forgot').mouseenter(function () {
        //     let username = $('#username').val(),
        //         message,
        //         rightUser = findUser(username);

        //     if (rightUser) {
        //         message = `${alerts.yourPassword}  <b>${rightUser.password}</b>`;
        //     } else {
        //         message = alerts.emptyUsername;
        //     }

        //     $(this).append(`<span>${message}</span>`);
        // });

        // $('.login__forgot').mouseleave(function () {
        //     $(this).find('span').remove();
        // });

        // document.querySelector('.login__button').addEventListener('click', () => {
        //     document.body.className = 'success';
        //});

        //ivents
        $('.btn-reg').click(() => {
            registration();
            showEndMessage();
        });
        
        $('.btn-go-main').click(() => {
            hide();
        });


        //Validate user
        $('.input__btn-entry').click(function () {
            let username = $('#username').val(),
                password = $('#password').val(),
                rightUser = findUser(username);

            $('.login__error').remove();
            $('.login__block').removeClass('invalid');

            if (username === '' || password === "") {
                alert(alerts.emptyFields);
                return;
            }

            if (!rightUser) {
                generateError('#username', alerts.noUsername);
                return;
            }

            if (rightUser.password === password) {
                hide();
            } else {
                generateError('#password', alerts.wrongPassword);
            }
        });

        //Functions
        function findUser(userName) {
            let user;

            $.each(users, (i, item) => {
                if (item.name == userName) {
                    user = item;
                    return;
                }
            });

            return user;
        }

        function generateError(item, message) {
            let span = document.createElement('span');
            $(span).addClass('login__error').text(message);
            $(span).insertAfter(item);

            $(item).parent('.login__block').addClass('invalid');
        }
        function hide() {
			let windowLog = document.getElementById('window-log');
            let windowChoose = document.getElementById('window-choose');
            let windowReg = document.getElementById('window-reg');
            let windowRegEnd = document.getElementById('window-reg-end');

			windowLog.style.display = "none";
            windowChoose.style.display = "none";
            windowReg.style.display = "none";
            windowRegEnd.style.display = 'none';
        }
        
        function registration() {
			let login = document.querySelector('.reg-user').value,
                password = document.querySelector('.reg-password').value,
                tel = document.querySelector('.reg-tel').value;
				

			localStorage.setItem('login', login);
            localStorage.setItem('password', password);
            localStorage.setItem('telephone', tel);
            hide();
        }
        
        function showEndMessage() {
            let windowRegEnd = document.getElementById('window-reg-end');

            windowRegEnd.style.display = 'block';
            
        }

        // function showWarningMessage(message) {
        //     $('<div/>').addClass('dialog-overlay')
        //                 .appendTo('body');

        //     $('<div/>').addClass('dialog')
        //                 .html(`<p>${message}</p>`)
        //                 .appendTo('body');

        //     setTimeout(() => {
        //         $('.dialog, .dialog-overlay').remove();
        //     }, 2000);
        // }

    });
})(jQuery);