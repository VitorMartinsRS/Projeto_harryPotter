$(document).ready(function () {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        const icon = $(this).find('i');
        icon.toggleClass('fa-bars fa-xmark');
    });
  });