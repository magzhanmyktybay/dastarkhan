/* =========================================================
   Recipe library: TheMealDB public API (fetch + JSON)
   https://www.themealdb.com/api.php  (free test key "1", no signup)

   Features:
   - loads a first set of dishes on page load
   - search by name (type + Enter or press Search)
   - filter by category (select, loaded from the API itself)
   - "Surprise me" button loads a random dish (refresh)
   - click a card -> full recipe in a Bootstrap modal
   - loading state, empty state and error handling with Retry
   Used on: menu.html
   ========================================================= */
$(function () {
  'use strict';

  var $grid = $('#recipe-grid');
  if (!$grid.length) { return; }

  var BASE = 'https://www.themealdb.com/api/json/v1/1/';
  var DEFAULT_QUERY = 'lamb';          // dish list shown on first load

  var $status = $('#recipe-status');
  var $search = $('#recipe-search');
  var $category = $('#recipe-category');
  var lastAction = null;               // remembered so "Try again" can repeat it
  var requestId = 0;                   // ignore answers of outdated requests

  // ---------- fetch helper with error handling ----------
  function getJSON(endpoint) {
    return fetch(BASE + endpoint)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Server answered with status ' + response.status);
        }
        return response.json();
      });
  }

  // ---------- status line under the controls ----------
  function showLoading() {
    $status.attr('class', 'recipe-status text-muted')
      .html('<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Loading dishes...');
  }

  function showMessage(text) {
    $status.attr('class', 'recipe-status text-muted').text(text);
  }

  function showError() {
    $grid.empty();
    $status.attr('class', 'recipe-status recipe-error').empty()
      .append($('<span>').text('Could not load dishes. Check your internet connection and try again. '))
      .append($('<button type="button" class="btn btn-sm btn-gold ms-2">Try again</button>')
        .on('click', function () { if (lastAction) { lastAction(); } }));
  }

  // ---------- render cards ----------
  function renderMeals(meals, label) {
    $grid.empty();

    if (!meals || !meals.length) {                       // API returns {meals: null}
      showMessage('No dishes found' + (label ? ' for "' + label + '"' : '') + '. Try another word or category.');
      return;
    }

    showMessage(meals.length + (meals.length === 1 ? ' dish' : ' dishes') + ' found');

    $.each(meals.slice(0, 12), function (i, meal) {
      var $card = $('<article class="recipe-card">');
      var $btn = $('<button type="button" class="recipe-open">').attr('data-id', meal.idMeal);
      $btn.append($('<img loading="lazy" width="350" height="350">')
        .attr({ src: meal.strMealThumb + '/medium', alt: meal.strMeal }));
      $btn.append($('<span class="recipe-name">').text(meal.strMeal));   // .text() = safe
      $card.append($btn);
      $grid.append($card);
    });
  }

  // ---------- actions (each one is repeatable by "Try again") ----------
  function loadSearch(query) {
    var id = ++requestId;
    lastAction = function () { loadSearch(query); };
    showLoading();
    getJSON('search.php?s=' + encodeURIComponent(query))
      .then(function (data) { if (id === requestId) { renderMeals(data.meals, query); } })
      .catch(function () { if (id === requestId) { showError(); } });
  }

  function loadCategory(category) {
    var id = ++requestId;
    lastAction = function () { loadCategory(category); };
    showLoading();
    getJSON('filter.php?c=' + encodeURIComponent(category))
      .then(function (data) { if (id === requestId) { renderMeals(data.meals, category); } })
      .catch(function () { if (id === requestId) { showError(); } });
  }

  function loadRandom() {
    var id = ++requestId;
    lastAction = loadRandom;
    showLoading();
    getJSON('random.php')
      .then(function (data) { if (id === requestId) { renderMeals(data.meals, ''); } })
      .catch(function () { if (id === requestId) { showError(); } });
  }

  // ---------- categories for the select (also from the API) ----------
  function loadCategories() {
    getJSON('list.php?c=list')
      .then(function (data) {
        $.each(data.meals || [], function (i, item) {
          $category.append($('<option>').val(item.strCategory).text(item.strCategory));
        });
      })
      .catch(function () {
        $category.prop('disabled', true);       // search still works without it
      });
  }

  // ---------- recipe details in a modal ----------
  var modalEl = document.getElementById('recipe-modal');
  var modal = bootstrap.Modal.getOrCreateInstance(modalEl);

  function openDetails(mealId) {
    $('#recipe-modal-title').text('Loading...');
    $('#recipe-modal-body').empty();
    modal.show();

    getJSON('lookup.php?i=' + encodeURIComponent(mealId))
      .then(function (data) {
        var meal = data.meals && data.meals[0];
        if (!meal) { throw new Error('Recipe not found'); }

        var $list = $('<ul class="recipe-ingredients">');
        for (var n = 1; n <= 20; n++) {                    // API has strIngredient1..20
          var name = $.trim(meal['strIngredient' + n] || '');
          if (name) {
            var measure = $.trim(meal['strMeasure' + n] || '');
            $list.append($('<li>').text((measure ? measure + ' ' : '') + name));
          }
        }

        $('#recipe-modal-title').text(meal.strMeal);
        $('#recipe-modal-body').append(
          $('<p class="text-muted">').text(meal.strCategory + ' \u00B7 ' + meal.strArea),
          $('<img class="recipe-modal-img" width="350" height="350">')
            .attr({ src: meal.strMealThumb + '/medium', alt: meal.strMeal }),
          $('<h3 class="h5 mt-3">').text('Ingredients'),
          $list,
          $('<h3 class="h5 mt-3">').text('Method'),
          $('<p class="recipe-method">').text(meal.strInstructions)
        );
      })
      .catch(function () {
        $('#recipe-modal-title').text('Recipe unavailable');
        $('#recipe-modal-body').empty().append(
          $('<p class="recipe-error mb-0">').text('Could not load this recipe. Close the window and try again.')
        );
      });
  }

  // ---------- events ----------
  $('#recipe-form').on('submit', function (e) {
    e.preventDefault();
    var query = $.trim($search.val());
    if (query === '') {
      showMessage('Type a dish name first, for example "chicken" or "soup".');
      return;
    }
    $category.val('');                                      // search and category are separate modes
    loadSearch(query);
  });

  $category.on('change', function () {
    var value = $(this).val();
    if (value === '') { loadSearch(DEFAULT_QUERY); return; }
    $search.val('');
    loadCategory(value);
  });

  $('#recipe-random').on('click', function () {
    $search.val('');
    $category.val('');
    loadRandom();
  });

  // one handler for all cards (they are created dynamically)
  $grid.on('click', '.recipe-open', function () {
    openDetails($(this).data('id'));
  });

  // ---------- start ----------
  loadCategories();
  loadSearch(DEFAULT_QUERY);
});
