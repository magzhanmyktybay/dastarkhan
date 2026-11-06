$(function () {
  'use strict';

  /* =========================================================
     2.1 FORM VALIDATION
     ========================================================= */
  var $regForm = $('#register-form');

  if ($regForm.length) {
    var EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    var $name = $('#reg-name');
    var $email = $('#reg-email');
    var $password = $('#reg-password');
    var $confirm = $('#reg-confirm');

    // Success / error icon, border colour and text message for one field
    function setFieldState($input, isValid, message) {
      $input.toggleClass('is-valid', isValid).toggleClass('is-invalid', !isValid);
      $input.siblings('.field-icon')
        .removeClass('bi-check-circle-fill bi-x-circle-fill text-success text-danger')
        .addClass(isValid ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger');
      $('#' + $input.attr('id') + '-msg')
        .removeClass('text-success text-danger')
        .addClass(isValid ? 'text-success' : 'text-danger')
        .text(message);
    }

    // Required field check
    function validateName() {
      if ($.trim($name.val()) === '') {
        setFieldState($name, false, 'Name is required.');
        return false;
      }
      setFieldState($name, true, 'Looks good!');
      return true;
    }

    // Required + email format with RegEx
    function validateEmail() {
      var value = $.trim($email.val());
      if (value === '') {
        setFieldState($email, false, 'Email is required.');
        return false;
      }
      if (!EMAIL_REGEX.test(value)) {
        setFieldState($email, false, 'Enter a valid email, for example name@mail.kz.');
        return false;
      }
      setFieldState($email, true, 'Valid email address.');
      return true;
    }

    // Password strength: 0 = empty, 1 = weak, 2 = medium, 3 = strong
    function getStrength(pw) {
      if (pw.length === 0) { return 0; }
      var score = 0;
      if (pw.length >= 8) { score++; }
      if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) { score++; }
      if (/\d/.test(pw)) { score++; }
      if (/[^A-Za-z0-9]/.test(pw)) { score++; }

      if (score === 4) { return 3; }
      if (score === 3 && pw.length >= 8) { return 2; }
      return 1;
    }

    // Required + strength indicator (weak / medium / strong)
    function validatePassword() {
      var level = getStrength($password.val());
      var meter = [
        { width: '0%', cls: '', text: 'Enter a password' },
        { width: '33%', cls: 'bg-danger', text: 'Weak' },
        { width: '66%', cls: 'bg-warning', text: 'Medium' },
        { width: '100%', cls: 'bg-success', text: 'Strong' }
      ][level];

      $('#strength-fill')
        .removeClass('bg-danger bg-warning bg-success')
        .addClass(meter.cls)
        .css('width', meter.width);
      $('#strength-text')
        .text('Strength: ' + meter.text)
        .attr('class', 'strength-text strength-' + level);

      if (level === 0) {
        setFieldState($password, false, 'Password is required.');
        return false;
      }
      if (level === 1) {
        setFieldState($password, false, 'Too weak: use 8+ characters with upper and lower case, numbers and symbols.');
        return false;
      }
      setFieldState($password, true, '');
      return true;
    }

    // Password confirmation must match
    function validateConfirm() {
      if ($confirm.val() === '') {
        setFieldState($confirm, false, 'Please repeat your password.');
        return false;
      }
      if ($confirm.val() !== $password.val()) {
        setFieldState($confirm, false, 'Passwords do not match.');
        return false;
      }
      setFieldState($confirm, true, 'Passwords match.');
      return true;
    }

    // Real-time feedback while the user types
    $name.on('input', validateName);
    $email.on('input', validateEmail);
    $password.on('input', function () {
      validatePassword();
      if ($confirm.val() !== '') { validateConfirm(); }
    });
    $confirm.on('input', validateConfirm);

    // Prevent submission if validation fails
    $regForm.on('submit', function (e) {
      e.preventDefault();

      var problems = [];
      if (!validateName()) { problems.push('Enter your name.'); }
      if (!validateEmail()) { problems.push('Enter a valid email address.'); }
      if (!validatePassword()) { problems.push('Choose a medium or strong password.'); }
      if (!validateConfirm()) { problems.push('Make sure both passwords match.'); }

      if (problems.length) {
        var $list = $('<ul class="mb-0 mt-2">');
        $.each(problems, function (i, text) { $list.append($('<li>').text(text)); });
        $('#register-success').addClass('d-none');
        $('#register-errors')
          .empty()
          .append('<strong>Please fix the following:</strong>', $list)
          .removeClass('d-none');
        return;
      }

      $('#register-errors').addClass('d-none');
      $('#register-success')
        .text('Registration successful! Welcome to the Dastarkhan club, ' + $.trim($name.val()) + '.')
        .removeClass('d-none');
      this.reset();
      $regForm.find('.is-valid').removeClass('is-valid');
      $regForm.find('.field-icon').removeClass('bi-check-circle-fill text-success');
      $regForm.find('.field-msg').text('');
      validatePassword();
      $password.removeClass('is-invalid');
      $('#reg-password-msg').text('');
    });
  }


  /* =========================================================
     2.2 DYNAMIC SEARCH AND FILTER
     ========================================================= */
  var $menuSearch = $('#menu-search');

  if ($menuSearch.length) {
    var activeCategory = 'all';

    function applyMenuFilter() {
      var query = $.trim($menuSearch.val()).toLowerCase();   // case-insensitive

      $('.menu-block').each(function () {
        var $block = $(this);

        if (activeCategory !== 'all' && $block.attr('id') !== activeCategory) {
          $block.hide();
          return;
        }

        var visibleRows = 0;
        $block.find('tbody tr').each(function () {
          var match = $(this).text().toLowerCase().indexOf(query) !== -1;
          $(this).toggle(match);
          if (match) { visibleRows++; }
        });
        $block.toggle(visibleRows > 0);
      });
    }

    // Search updates immediately while typing
    $menuSearch.on('input', applyMenuFilter);

    // Category buttons work together with the search bar
    $('.filter-btn').on('click', function () {
      activeCategory = $(this).data('filter');
      $('.filter-btn').removeClass('active').attr('aria-pressed', 'false');
      $(this).addClass('active').attr('aria-pressed', 'true');
      applyMenuFilter();
    });
  }


  /* =========================================================
     2.3 DYNAMIC TABLE WITH CRUD OPERATIONS
     ========================================================= */
  var $resBody = $('#reservations-body');

  if ($resBody.length) {
    var reservations = [
      { id: 1, name: 'Aruzhan Bekova', phone: '+7 701 555 12 34', date: '2026-12-05', time: '19:00', guests: 4, seating: 'Yurt room' },
      { id: 2, name: 'Daniyar Omarov', phone: '+7 777 210 45 67', date: '2026-12-07', time: '13:30', guests: 2, seating: 'Main hall' },
      { id: 3, name: 'Saule Nurlanovna', phone: '+7 705 980 11 22', date: '2026-12-31', time: '20:00', guests: 12, seating: 'Family hall' }
    ];
    var nextId = 4;
    var $resForm = $('#reservation-form');
    var modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('reservation-modal'));

    function findById(id) {
      return $.grep(reservations, function (r) { return r.id === id; })[0];
    }

    // READ: display all records in the table
    function renderTable() {
      $resBody.empty();
      $.each(reservations, function (i, r) {
        var $row = $('<tr>').attr('data-id', r.id);
        $row.append($('<td>').text(i + 1));
        $row.append($('<td class="fw-bold">').text(r.name));
        $row.append($('<td>').text(r.phone));
        $row.append($('<td>').text(r.date));
        $row.append($('<td>').text(r.time));
        $row.append($('<td>').text(r.guests));
        $row.append($('<td>').append($('<span class="badge seating-badge">').text(r.seating)));
        $row.append(
          $('<td class="text-end text-nowrap">').append(
            '<button type="button" class="btn btn-sm btn-outline-primary me-1 edit-btn"><i class="bi bi-pencil"></i> Edit</button>',
            '<button type="button" class="btn btn-sm btn-outline-danger delete-btn"><i class="bi bi-trash"></i> Delete</button>'
          )
        );
        $resBody.append($row);
      });
    }

    function resetForm() {
      $resForm[0].reset();
      $resForm.removeClass('was-validated');
      $('#res-id').val('');
    }

    // CREATE: open an empty modal
    $('#add-reservation-btn').on('click', function () {
      resetForm();
      $('#reservation-modal-title').text('Add reservation');
      modal.show();
    });

    // UPDATE: open the modal filled with the row's data
    $resBody.on('click', '.edit-btn', function () {
      var r = findById(Number($(this).closest('tr').data('id')));
      resetForm();
      $('#reservation-modal-title').text('Edit reservation');
      $('#res-id').val(r.id);
      $('#res-name').val(r.name);
      $('#res-phone').val(r.phone);
      $('#res-date').val(r.date);
      $('#res-time').val(r.time);
      $('#res-guests').val(r.guests);
      $('#res-seating').val(r.seating);
      modal.show();
    });

    // DELETE: with confirmation prompt
    $resBody.on('click', '.delete-btn', function () {
      var id = Number($(this).closest('tr').data('id'));
      var r = findById(id);
      if (window.confirm('Delete the reservation for ' + r.name + '?')) {
        reservations = $.grep(reservations, function (item) { return item.id !== id; });
        renderTable();
      }
    });

    // Save from the modal (create or update)
    $resForm.on('submit', function (e) {
      e.preventDefault();
      if (!this.checkValidity()) {
        $resForm.addClass('was-validated');
        return;
      }

      var data = {
        name: $.trim($('#res-name').val()),
        phone: $.trim($('#res-phone').val()),
        date: $('#res-date').val(),
        time: $('#res-time').val(),
        guests: Number($('#res-guests').val()),
        seating: $('#res-seating').val()
      };
      var id = Number($('#res-id').val());

      if (id) {
        $.extend(findById(id), data);           // update
      } else {
        data.id = nextId++;                      // create
        reservations.push(data);
      }

      modal.hide();
      renderTable();
    });

    renderTable();
  }


  /* =========================================================
     2.4 IMAGE GALLERY LIGHTBOX
     ========================================================= */
  var $galleryImages = $('.gallery-item img');
  var $lightbox = $('#lightbox');

  if ($galleryImages.length && $lightbox.length) {
    var current = 0;
    var total = $galleryImages.length;

    function showImage(index, direction) {
      current = (index + total) % total;
      var $img = $galleryImages.eq(current);

      // fade the old photo out, then slide + fade the new one in
      $('#lightbox-img').stop(true, true).fadeOut(150, function () {
        $(this)
          .attr({ src: $img.attr('src'), alt: $img.attr('alt') })
          .css({ left: (direction * 60) + 'px', opacity: 0 })
          .show()
          .animate({ left: 0, opacity: 1 }, 300);
      });
      $('#lightbox-caption').text($img.attr('alt'));
    }

    // Click on a photo opens the lightbox
    $galleryImages.on('click', function () {
      showImage($galleryImages.index(this), 0);
      $lightbox.removeAttr('hidden').hide().fadeIn(300);
    });

    // Navigation arrows
    $('#lightbox-next').on('click', function () { showImage(current + 1, 1); });
    $('#lightbox-prev').on('click', function () { showImage(current - 1, -1); });

    // Close
    $('#lightbox-close').on('click', function () {
      $lightbox.fadeOut(300, function () {
        $lightbox.attr('hidden', '');
      });
    });
  }
});
