// EVA 360 Service — shared behaviour

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Formspree integration.
  // Each <form data-form> carries its own action="https://formspree.io/f/YOUR_ID".
  // Replace YOUR_ID in booking.html and contact.html once you have a real
  // Formspree form endpoint — see the setup steps you were given.
  var forms = document.querySelectorAll('[data-form]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      var button = form.querySelector('button[type="submit"]');
      var originalLabel = button ? button.textContent : '';
      var endpoint = form.getAttribute('action');

      function showStatus(message, isError) {
        if (!status) return;
        status.textContent = message;
        status.classList.add('visible');
        status.classList.toggle('is-error', !!isError);
      }

      if (!endpoint || endpoint.indexOf('YOUR_FORM_ID') !== -1) {
        showStatus('Forms aren\u2019t connected yet \u2014 add your Formspree endpoint in the form\u2019s action attribute.', true);
        return;
      }

      if (button) {
        button.textContent = 'Sending…';
        button.disabled = true;
      }

      fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            showStatus('Thanks — your request has been sent. EVA 360 Service will call you back shortly.', false);
            form.reset();
          } else {
            return response.json().then(function (data) {
              var msg = (data && data.errors && data.errors.length)
                ? data.errors.map(function (err) { return err.message; }).join(', ')
                : 'Something went wrong sending that — please call us instead on 07445 412907.';
              showStatus(msg, true);
            });
          }
        })
        .catch(function () {
          showStatus('Something went wrong sending that — please call us instead on 07445 412907.', true);
        })
        .finally(function () {
          if (button) {
            button.textContent = originalLabel;
            button.disabled = false;
          }
        });
    });
  });
});
