$(function () {
  var USER_KEY = 'dastarkhan_user';
  var EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  function getUser() {
    var saved = localStorage.getItem(USER_KEY);
    if (saved === null) {
      saved = sessionStorage.getItem(USER_KEY);
    }
    if (saved === null) {
      return null;
    }
    return JSON.parse(saved);
  }

  function saveUser(user, remember) {
    var text = JSON.stringify(user);
    if (remember) {
      localStorage.setItem(USER_KEY, text);
    } else {
      sessionStorage.setItem(USER_KEY, text);
    }
  }

  function signOut() {
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
  }

  function makeName(email) {
    var name = email.split('@')[0].replace(/[._+-]/g, ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function updateHeader() {
    var user = getUser();
    var $slot = $('#auth-slot');

    if (user === null) {
      $slot.html('<a href="login.html" class="btn btn-ghost btn-sm btn-signin">Sign in</a>');
    } else {
      $slot.html(
        '<span class="user-chip" title="' + user.email + '">' +
          '<i class="bi bi-person-circle"></i> ' +
          '<span class="user-name">' + user.name + '</span>' +
        '</span>' +
        '<button type="button" class="btn btn-ghost btn-sm btn-signout" data-signout>Sign out</button>'
      );
    }
  }

  $(document).on('click', '[data-signout]', function () {
    signOut();
    updateHeader();
    showLoginPageState();
  });

  var $form = $('#login-form');
  var $email = $('#login-email');
  var $password = $('#login-password');

  function showLoginPageState() {
    if ($form.length === 0) {
      return;
    }
    var user = getUser();
    if (user === null) {
      $('#login-already').addClass('d-none');
      $('#login-box').removeClass('d-none');
    } else {
      $('#login-already-email').text(user.email);
      $('#login-box').addClass('d-none');
      $('#login-already').removeClass('d-none');
    }
  }

  function setFieldState($input, isValid, message) {
    $input.toggleClass('is-valid', isValid).toggleClass('is-invalid', !isValid);
    $input.siblings('i.field-icon')
      .removeClass('bi-check-circle-fill bi-x-circle-fill text-success text-danger')
      .addClass(isValid ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger');
    $('#' + $input.attr('id') + '-msg')
      .removeClass('text-success text-danger')
      .addClass(isValid ? 'text-success' : 'text-danger')
      .text(message);
  }

  function validateEmail() {
    var value = $.trim($email.val());
    if (value === '') {
      setFieldState($email, false, 'Please enter your email.');
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setFieldState($email, false, 'Enter a valid email, e.g. name@example.com.');
      return false;
    }
    setFieldState($email, true, '');
    return true;
  }

  function validatePassword() {
    var value = $password.val();
    if (value === '') {
      setFieldState($password, false, 'Please enter your password.');
      return false;
    }
    if (value.length < 6) {
      setFieldState($password, false, 'Password must be at least 6 characters.');
      return false;
    }
    $password.removeClass('is-invalid').addClass('is-valid');
    $('#login-password-msg').text('');
    return true;
  }

  if ($form.length) {
    $email.on('input', validateEmail);
    $password.on('input', validatePassword);

    $('#toggle-password').on('click', function () {
      var $icon = $(this).find('i');
      if ($password.attr('type') === 'password') {
        $password.attr('type', 'text');
        $icon.attr('class', 'bi bi-eye-slash');
      } else {
        $password.attr('type', 'password');
        $icon.attr('class', 'bi bi-eye');
      }
    });

    $form.on('submit', function (e) {
      e.preventDefault();

      var emailOk = validateEmail();
      var passwordOk = validatePassword();

      if (!emailOk || !passwordOk) {
        $('#login-errors')
          .text('Please fix the highlighted fields and try again.')
          .removeClass('d-none');
        return;
      }

      $('#login-errors').addClass('d-none');

      var email = $.trim($email.val()).toLowerCase();
      var user = {
        email: email,
        name: makeName(email)
      };
      saveUser(user, $('#login-remember').is(':checked'));

      window.location.href = 'index.html';
    });

    showLoginPageState();
  }

  updateHeader();
});