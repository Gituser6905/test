




// Donate form checkbox condition

$(document).ready(function () {



  $("#donorMob").val(function (index, value) {
    return value.trim();

  });

  $("#donorMob").on('input', function () {
    this.value = this.value.slice(0, 10);
  });


  $("#vol-btn").click(function () {
    $("#vol-form").slideToggle("slow");
  })

  // Function to handle button clicks
  $('.amount_edu_btn button').on('click', function () {
    var value = $(this).data('value');

    $('#edu_amount').val(value);
    $('.amount_edu_btn button').removeClass('edu_active_btn');

    // Add active class to the clicked button
    $(this).addClass('edu_active_btn');
  });

  // Handle input changes in the amount field
  $('#edu_amount').on('input', function () {
    var value = $(this).val();
    var predefinedAmounts = ['100', '500', '1000', '5000', '10000'];
    $('.amount_edu_btn button').removeClass('edu_active_btn');

    $('#custom_amt').removeClass('edu_active_btn');

    if (predefinedAmounts.includes(value)) {
      $('.amount_edu_btn button[data-value="' + value + '"]').addClass('edu_active_btn');
    } else {
      $('#custom_amt').addClass('edu_active_btn');
    }
  });

  // Set the default active class based on the initial input value
  var defaultValue = $('#edu_amount').val();
  $('.amount_edu_btn button').removeClass('edu_active_btn');
  $('#custom_amt').removeClass('edu_active_btn');

  if ($('.amount_edu_btn button[data-value="' + defaultValue + '"]').length) {
    $('.amount_edu_btn button[data-value="' + defaultValue + '"]').addClass('edu_active_btn');
  } else {
    $('#custom_amt').addClass('edu_active_btn');
  }

  // To validate the date

const today = new Date();
const targetDate = new Date(today);

// Get current hour in 24-hour format
const currentHour = today.getHours();

// If time is before 1:00 (13:00 in 24-hour format), use today's date
// If time is 1:00 or later, use tomorrow's date
if (currentHour >= 13) {
  targetDate.setDate(today.getDate() + 1);
}

const year = targetDate.getFullYear();
const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
const day = targetDate.getDate().toString().padStart(2, '0');

const result = `${year}-${month}-${day}`;

// Set the min and value attributes for all required input fields
const serviceDateInput = $('#service_date');
const orphanage_serviceDate = $('#orph_date');
const orph_groc_date = $('#orph_groc_date');

orph_groc_date.attr('min', result).val(result);
orphanage_serviceDate.attr('min', result).val(result);
serviceDateInput.attr('min', result).val(result);




  if (document.getElementById('edu_visitbtn') && document.querySelector('.edu_form_1')) {
    window.addEventListener('scroll', function () {
      let donateBtn = document.getElementById('edu_visitbtn');
      let form = document.querySelector('.edu_form_1');
      let formBottom = form.offsetHeight + form.offsetTop;
      let scrollPosition = window.scrollY + window.innerHeight;

      if (scrollPosition >= (formBottom) + 150) {
        donateBtn.classList.add('edu_btn_donate');
      } else {
        donateBtn.classList.remove('edu_btn_donate');
      }
    });
  }








  // orphanage page validation over

  // Date picker ui using jquery
  $("#vol-dob").datepicker();

  // Slick carousel started
  var titleMain = $("#animatedHeading");
  var titleSubs = titleMain.find("slick-active");

  if (titleMain.length) {

    titleMain.slick({
      autoplay: false,
      arrows: false,
      dots: false,
      slidesToShow: 4,
      centerPadding: "10px",
      draggable: false,
      infinite: true,
      pauseOnHover: false,
      swipe: false,
      touchMove: false,
      vertical: true,
      speed: 1000,
      autoplaySpeed: 2000,
      useTransform: true,
      cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
      adaptiveHeight: true,
    });

    // On init
    $(".slick-dupe").each(function (index, el) {
      $("#animatedHeading").slick('slickAdd', "<div>" + el.innerHTML + "</div>");
    });

    // Manually refresh positioning of slick
    titleMain.slick('slickPlay');
  };

  $('.popup-link').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });




  // Volunteer form validation

  $("#volunteer-btn").click(function (e) {
    e.preventDefault();
    $(".error-msg").remove(); // Remove previous error messages

    let isValid = true;
    let firstInvalidField = null;

    // Define the fields to validate
    let fields = [
      { id: "#vol-name", errorMessage: "Name required", group: ".form-group1" },
      { id: "#vol-mob", errorMessage: "Phone required", group: ".form-group2" },
      { id: "#vol-email", errorMessage: "Email required", group: ".form-group3", validate: validateEmail },
      { id: "#vol-gender select", errorMessage: "Gender required", group: ".form-group-gender", validate: validateSelect },
      { id: "#vol-dob", errorMessage: "DOB required", group: ".form-group4" },
      { id: "#vol-blood-group select", errorMessage: "Blood group required", group: ".form-group-blood-group", validate: validateSelect },
      { id: "#vol-street", errorMessage: "Address required", group: ".form-group5" },
      { id: "#vol-add", errorMessage: "Town/City required", group: ".form-group6" },
      { id: "#vol-password", errorMessage: "Password required", group: ".secure-input1" },
      { id: "#vol-confirm", errorMessage: "Confirm password required", group: ".secure-input2" },
    ];

    // Validate each field one by one
    for (let field of fields) {
      const value = $(field.id).val().trim();

      if (field.id === "#vol-confirm") {
        if ($("#vol-password").val().trim() !== value) {
          $(field.group).append('<span class="error-msg">Password mismatch</span>');
          isValid = false;
          if (!firstInvalidField) firstInvalidField = $(field.id);
          break;
        }
      } else if (value === "" || (field.id === "#vol-gender select" && value === "Select your gender") || (field.id === "#vol-blood-group select" && value === "Select your blood group")) {
        $(field.group).append('<span class="error-msg">' + field.errorMessage + '</span>');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = $(field.id);
        break;
      } else if (field.validate && !field.validate(value)) {
        $(field.group).append('<span class="error-msg">Invalid Email</span>');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = $(field.id);
        break;
      }
    }

    // Validate file upload
    if (isValid && $("#vol-file").val().trim() === "") {
      $(".form-group8").append('<span class="error-msg">CV required</span>');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = $("#vol-file");
    }

    if (isValid) {
      // Everything validate after content
      // console.log("Submit the page")
      document.getElementById("volunteer-form").submit();

    }

    // Scroll to the first invalid field if necessary
    if (!isValid && firstInvalidField) {
      $('html, body').animate({ scrollTop: firstInvalidField.offset().top - 150 }, 500);
      firstInvalidField.focus();
    }

    // Handle input events to remove error messages
    $("#vol-name, #vol-mob, #vol-email, #vol-dob, #vol-street, #vol-add, #vol-password, #vol-confirm, #vol-file, #vol-gender select, #vol-blood-group select").on('input change', function () {
      $(this).closest('.form-group').find('.error-msg').remove();
    });

    // Function to validate email
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    // Function to validate select boxes
    function validateSelect(value) {
      return value !== "Select your gender" && value !== "Select your blood group";
    }
  });

  // Volunteer form 2 validation

  $("#volunteer2-btn").click(function (e) {
    e.preventDefault();
    $(".error-msg").remove(); // Remove previous error messages

    let isValid = true;
    let firstInvalidField = null;

    // Define the fields to validate
    let fields = [
      { id: "#vol2-name", errorMessage: "Name required", group: ".form-group-1" },
      { id: "#vol2-mob", errorMessage: "Phone required", group: ".form-group-2" },
      { id: "#vol2-email", errorMessage: "Email required", group: ".form-group-3", validate: validateEmail },
      { id: "#vol2-gender select", errorMessage: "Gender required", group: ".form-group-gender2", validate: validateSelect },
      { id: "#vol2-dob", errorMessage: "DOB required", group: ".form-group-4" },
      { id: "#vol2-blood-group select", errorMessage: "Blood group required", group: ".form-group-blood-group2", validate: validateSelect },
      { id: "#vol2-street", errorMessage: "Address required", group: ".form-group-5" },
      { id: "#vol2-add", errorMessage: "Town/City required", group: ".form-group-6" },
      { id: "#vol2-password", errorMessage: "Password required", group: ".secure-input-1" },
      { id: "#vol2-confirm", errorMessage: "Confirm password required", group: ".secure-input-2" },
    ];

    // Validate each field one by one
    for (let field of fields) {
      const value = $(field.id).val().trim();

      if (field.id === "#vol2-confirm") {
        if ($("#vol2-password").val().trim() !== value) {
          $(field.group).append('<span class="error-msg">Password mismatch</span>');
          isValid = false;
          if (!firstInvalidField) firstInvalidField = $(field.id);
          break;
        }
      } else if (value === "" || (field.id === "#vol2-gender select" && value === "Select your gender") || (field.id === "#vol2-blood-group select" && value === "Select your blood group")) {
        $(field.group).append('<span class="error-msg">' + field.errorMessage + '</span>');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = $(field.id);
        break;
      } else if (field.validate && !field.validate(value)) {
        $(field.group).append('<span class="error-msg">Invalid Email</span>');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = $(field.id);
        break;
      }
    }

    // Validate file upload
    if (isValid && $("#vol2-file").val().trim() === "") {
      $(".form-group-8").append('<span class="error-msg">CV required</span>');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = $("#vol2-file");
    }

    if (isValid) {
      // Everything validate after content
      // console.log("Submit the page")
      document.getElementById("volunteer2-form").submit();

    }

    // Scroll to the first invalid field if necessary
    if (!isValid && firstInvalidField) {
      $('html, body').animate({ scrollTop: firstInvalidField.offset().top - 150 }, 500);
      firstInvalidField.focus();
    }

    // Handle input events to remove error messages
    $("#vol-name, #vol-mob, #vol-email, #vol-dob, #vol-street, #vol-add, #vol-password, #vol-confirm, #vol-file, #vol-gender select, #vol-blood-group select").on('input change', function () {
      $(this).closest('.form-group').find('.error-msg').remove();
    });

    // Function to validate email
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    // Function to validate select boxes
    function validateSelect(value) {
      return value !== "Select your gender" && value !== "Select your blood group";
    }
  });
  //////////////////////////////////////////////////////
  // Donation form Validation
  // function getLocationAndSubmit() {
  //   if (navigator.geolocation) {
  //     // Prompt the user to allow geolocation access
  //     navigator.geolocation.getCurrentPosition(handlePositionSuccess, handlePositionError, { timeout: 10000 });
  //   } else {
  //     console.log('Geolocation is not supported by this browser.');
  //   }
  // }

  // function handlePositionSuccess(position) {
  //   const latitude = position.coords.latitude.toFixed(6);
  //   const longitude = position.coords.longitude.toFixed(6);
  //   fetchCityName(latitude, longitude);
  // }

  // function fetchCityName(latitude, longitude) {
  //   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       const city = data.address.city || 'Not found';
  //       document.getElementById('city').value = city;
  //     })
  //     .catch(error => {
  //       console.error('Error fetching city:', error);
  //       document.getElementById('city').value = 'Error';
  //     })
  //     .finally(() => {
  //       validateAndSubmitForm(); // Call the validation and submission logic here
  //     });
  // }

  // function handlePositionError(error) {
  //   console.error('Geolocation error:', error);
  //   validateAndSubmitForm(); // Proceed with form validation even if geolocation fails
  // }

  // // Function to validate and submit the form
  // function validateAndSubmitForm() {
  //   $(".error-msg").remove();

  //   let isValid = true;
  //   let firstInvalidField = null;
  //   let fields = [
  //     { id: "#donorname", errorMessage: "Name required", group: ".form-group1" },
  //     { id: "#donoremail", errorMessage: "Email required", group: ".form-group2", validate: validateEmail },
  //     { id: "#donorMob", errorMessage: "Phone required", group: ".form-group3", validate: validatePhone },
  //     { id: "#donorParcel", errorMessage: "Parcel Name required", group: ".form-group4" },
  //     { id: "#foodcount", errorMessage: "Food Required", group: ".form-group5" },
  //   ];

  //   for (let field of fields) {
  //     const value = $(field.id).val().trim();

  //     if (value === "") {
  //       $(field.group).append('<span class="error-msg">' + field.errorMessage + '</span>');
  //       isValid = false;
  //       if (!firstInvalidField) firstInvalidField = $(field.id);
  //       break;
  //     } else if (field.validate && !field.validate(value)) {
  //       $(field.group).append('<span class="error-msg">' + (field.errorMessage === "Phone required" ? "Invalid Phone Number" : "Invalid email") + '</span>');
  //       isValid = false;
  //       if (!firstInvalidField) firstInvalidField = $(field.id);
  //       break;
  //     }
  //   }

  //   if (isValid) {
  //     // Set cookies before form submission
  //     setDonationCookies();
  //     document.getElementById("donation-form").submit();
  //   } else if (firstInvalidField) {
  //     $('html, body').animate({ scrollTop: firstInvalidField.offset().top - 150 }, 500);
  //     firstInvalidField.focus();
  //   }
  // }

  // // Function to set cookies with form data
  // function setDonationCookies() {
  //   // Get form values
  //   const donorName = $("#donorname").val().trim();
  //   const donorEmail = $("#donoremail").val().trim();
  //   const donorPhone = $("#donorMob").val().trim();
  //   const donorParcel = $("#donorParcel").val().trim();
  //   const foodCount = $("#foodcount").val().trim();

  //   // Set cookies with 30 days expiration
  //   const expirationDays = 30;
  //   const date = new Date();
  //   date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  //   const expires = "expires=" + date.toUTCString();

  //   // Set each cookie with path and expiration
  //   document.cookie = "donorName=" + encodeURIComponent(donorName) + ";" + expires + ";path=/";
  //   document.cookie = "donorEmail=" + encodeURIComponent(donorEmail) + ";" + expires + ";path=/";
  //   document.cookie = "donorPhone=" + encodeURIComponent(donorPhone) + ";" + expires + ";path=/";
  //   document.cookie = "donorParcel=" + encodeURIComponent(donorParcel) + ";" + expires + ";path=/";
  //   // document.cookie = "foodCount=" + encodeURIComponent(foodCount) + ";" + expires + ";path=/";

  //   // Store submission timestamp
  //   document.cookie = "lastDonationTime=" + new Date().toISOString() + ";" + expires + ";path=/";
  // }

  // // Helper function to get cookie value by name
  // function getCookie(name) {
  //   const nameEQ = name + "=";
  //   const ca = document.cookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  //   }
  //   return null;
  // }

  // // Function to pre-fill form with cookie data if available
  // function prefillFormFromCookies() {
  //   const fields = {
  //     'donorname': 'donorName',
  //     'donoremail': 'donorEmail',
  //     'donorMob': 'donorPhone',
  //     'donorParcel': 'donorParcel',
  //     // 'foodcount': 'foodCount'
  //   };

  //   for (const [fieldId, cookieName] of Object.entries(fields)) {
  //     const cookieValue = getCookie(cookieName);
  //     if (cookieValue) {
  //       $(`#${fieldId}`).val(cookieValue);
  //     }
  //   }
  // }

  // // Phone number validation function for exactly 10 digits
  // function validatePhone(number) {
  //   return /^\d{10}$/.test(number);
  // }

  // // Validate email function
  // function validateEmail(email) {
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // }

  // // Trigger geolocation request when the "Donate Now" button is clicked
  // $("#donatebtn").click(function (e) {
  //   e.preventDefault();
  //   getLocationAndSubmit();
  // });

  // // Call prefill function when document is ready
  // $(document).ready(function () {
  //   prefillFormFromCookies();
  // });

  // // Handle input events to remove error messages
  // $("#donorname, #donoremail, #donorMob, #donorParcel").on('input', function () {
  //   $(this).closest('.form-group').find('.error-msg').remove();
  // });
  ////////////////////////////////////////////////////////////




  // Duplicate button don't modify here modify the donation form validation if changes needed
  // $("#visitbtn").click(function (e) {
  //   e.preventDefault();
  //   $(".error-msg").remove();

  //   let isValid = true;
  //   let firstInvalidField = null;
  //   let fields = [
  //     { id: "#donorname", errorMessage: "Name required", group: ".form-group1" },
  //     { id: "#donoremail", errorMessage: "Email required", group: ".form-group2", validate: validateEmail },
  //     { id: "#donorMob", errorMessage: "Phone required", group: ".form-group3" },
  //     { id: "#donorParcel", errorMessage: "Parcel Name required", group: ".form-group4" },
  //   ];


  //   for (let field of fields) {
  //     const value = $(field.id).val().trim();

  //     if (value === "") {
  //       $(field.group).append('<span class="error-msg">' + field.errorMessage + '</span>');
  //       isValid = false;
  //       if (!firstInvalidField) firstInvalidField = $(field.id); // Capture the first invalid field
  //       break; // Stop further validation if any field is invalid
  //     } else if (field.validate && !field.validate(value)) {
  //       $(field.group).append('<span class="error-msg">Invalid email</span>');
  //       isValid = false;
  //       if (!firstInvalidField) firstInvalidField = $(field.id); // Capture the first invalid field
  //       break; // Stop further validation if email is invalid
  //     }
  //   }

  //   // If all validations pass, submit the form
  //   if (isValid) {
  //     document.getElementById("donation-form").submit();
  //   } else if (firstInvalidField) {
  //     // Scroll to top innvalid page
  //     $('html, body').animate({ scrollTop: firstInvalidField.offset().top - 150 }, 500);
  //     firstInvalidField.focus();
  //   }

  //   // Handle input events to remove error messages
  //   $("#donorname, #donoremail, #donorMob, #donorParcel").on('input', function () {
  //     $(this).closest('.form-group').find('.error-msg').remove();
  //   });

  //   // Function to validate email
  //   function validateEmail(email) {
  //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     return regex.test(email);
  //   }
  // });

  // Education_detail page validation
  $("#edu_donate_btn").click(function (e) {
    e.preventDefault();
    $(".error-msg").remove(); // Remove previous error messages

    let isValid = true;
    let firstInvalidField = null;

    // Define the fields to validate
    let fields = [
      { id: "#edu_donor_name", errorMessage: "Name required", group: ".edu_form_group" },
      { id: "#edu_donor_mob", errorMessage: "Phone required", group: ".edu_form_group_2" },
      { id: "#edu_email", errorMessage: "Email required", group: ".edu_form_group_3", validate: validateEmail },
    ];

    // Validate each field one by one
    for (let field of fields) {
      const value = $(field.id).val().trim();

      if (value === "") {
        $(field.group).append('<span class="error-msg">' + field.errorMessage + '</span>');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = $(field.id); // Capture the first invalid field
        break; // Stop further validation if any field is invalid
      } else if (field.validate && !field.validate(value)) {
        $(field.group).append('<span class="error-msg">Invalid email</span>');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = $(field.id); // Capture the first invalid field
        break; // Stop further validation if email is invalid
      }
    }

    // If all validations pass, submit the form
    if (isValid) {
      document.getElementById("donation-form").submit();
    } else if (firstInvalidField) {
      // Scroll to top innvalid page
      $('html, body').animate({ scrollTop: firstInvalidField.offset().top - 150 }, 500);
      firstInvalidField.focus();
    }

    // Handle input events to remove error messages
    $("#donorname, #donoremail, #donorMob, #donorParcel").on('input', function () {
      $(this).closest('.form-group').find('.error-msg').remove();
    });

    // Function to validate email
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }




  })




  $(".selected-label-1").click(function () {
    if ($("#selected-item-1").prop("checked")) {
      $(".wishmsg").slideDown()
      $('.owl-carousel').trigger('stop.owl.autoplay'); // when clicked on the carousel it stop
    } else {
      $(".wishmsg").slideUp()
      $('.owl-carousel').trigger('play.owl.autoplay');// it start playing carousel
    }
  })

  $(".selected-label-2").click(function () {
    if ($("#selected-item-2").prop("checked")) {
      $(".photomsg").slideDown()
      $('.owl-carousel').trigger('stop.owl.autoplay'); // when clicked on the carousel it stop

    } else {
      $(".photomsg").slideUp()
      $('.owl-carousel').trigger('play.owl.autoplay');// it start playing carousel

    }
  })

  $(".selected-label-3").click(function () {
    if ($("#selected-item-3").prop("checked")) {
      $(".taxmsg").slideDown()
      $('.owl-carousel').trigger('stop.owl.autoplay'); // when clicked on the carousel it stop

    } else {
      $(".taxmsg").slideUp()
      $('.owl-carousel').trigger('play.owl.autoplay');// it start playing carousel

    }
  })

  //

  let total = 0;
  var foodCountValue_1 = parseInt($('#food_count_orphanage').val(), 10) || 0; // Default to 0 if parsing fails
  var orph_photo = document.getElementById("selected-item-2");

  // Function to update the total amount
  function updateTotal() {
    $('#total_amount').val(total);
    if (typeof total !== 'number' || isNaN(total)) {
      total = 0; // Default to 0 if total is not a number
    }
    $('#added_total_amount').text(`Total Amount: ${total.toFixed(2)}`);


    if (orph_photo.checked) {
      var updatedAmount = total + (foodCountValue_1 * 5);
      console.log("Checkbox checked, net amount updated to:", updatedAmount);
    } else {
      var updatedAmount = total;
      console.log("Checkbox not checked, net amount:", updatedAmount);
    }

    $('#neta_mount').val(updatedAmount);
  }

  // Trigger the updateTotal function when the checkbox state changes
  orph_photo.addEventListener('change', function () {
    // Update foodCountValue when checkbox state changes
    foodCountValue_1 = parseInt($('#food_count_orphanage').val(), 10) || 0;
    updateTotal();
  });

  // Initial call to set the correct total amount
  updateTotal();


  // Function to calculate total for specific checkboxes
  function calculateSubContentTotal(selector) {
    let subTotal = 0;
    $(selector).find('input[type="checkbox"]').each(function () {
      const value = parseInt($(this).val(), 10);
      if ($(this).is(':checked')) {
        subTotal += value * food_count;
      }
    });
    return subTotal;
  }

  // Function to uncheck checkboxes within sub-content and adjust total
  function uncheckSubContentCheckboxes(selector) {
    $(selector).find('input[type="checkbox"]').each(function () {
      if ($(this).is(':checked')) {
        const value = parseInt($(this).val(), 10);
        total -= value * food_count;
        $(this).prop("checked", false);
      }
    });
    updateTotal();
  }





  // Toggle sub-content visibility and handle checkbox state
  function toggleSubContent(selector) {
    $(selector).slideToggle(500, function () {
      if ($(selector).is(":visible")) {
        // If sub-content is visible, add its total to the main total
        total += calculateSubContentTotal(selector);
      } else {
        // If sub-content is hidden, uncheck its checkboxes and subtract their total from the main total
        uncheckSubContentCheckboxes(selector);
      }
      updateTotal();
      updateLabelDisplay(); // Update label display when sub-content is toggled
    });
  }



  // Event handler for checkbox change
  $('.orph_check_input_1').on('change', function () {
    const value = parseInt($(this).val(), 10);
    if ($(this).is(':checked')) {
      total += value * 20;
    } else {
      total -= value * 20;
    }
    updateTotal();
    updateLabelDisplay(); // Update label display on checkbox change
  });
  //

  // validation input

  // var foodCount = document.getElementById("foodcount");
  // var netAmount = document.getElementById("netamount");
  // var wishCheckBox = document.getElementById("selected-item-1");
  // var photoCheckBox = document.getElementById("selected-item-2");
  // var allFoodValue = document.getElementById("allfood");
  // var userFoodCount = 0;
  // var foodCountValue = parseInt(2500 / allFoodValue.value) || 0;

  // // Event listener for foodCount input
  // foodCount.addEventListener('input', () => {
  //   userFoodCount = parseInt(foodCount.value) || 0;
  //   updateAmounts();
  // });

  // // Event listener for wishCheckBox change
  // wishCheckBox.addEventListener('change', function () {
  //   var totalAmount = parseInt(netAmount.value) || 0;

  //   if (userFoodCount <= 100) {
  //     if (totalAmount < 2499) {
  //       if (this.checked) {
  //         if (userFoodCount < foodCountValue) {
  //           // If the current foodCount is less than the default foodCountValue, set it to foodCountValue
  //           foodCount.value = foodCountValue;
  //         }
  //         netAmount.value = 2500;
  //         if (foodCount.value <= 83) {
  //           foodCount.value = foodCountValue + 2;
  //         }
  //       } else {
  //         // When unchecked, restore to the userFoodCount
  //         foodCount.value = userFoodCount;
  //         netAmount.value = parseInt(netAmount.value) || 0;
  //       }
  //     }
  //   }
  //   updateAmounts();
  // });

  // // Event listener for photoCheckBox change
  // photoCheckBox.addEventListener('change', function () {
  //   updateAmounts();
  // });

  // // Function to update amounts
  // function updateAmounts() {
  //   var allFood = parseInt($("#allfood").val()) || 0;
  //   var foodCountValue = parseInt($("#foodcount").val()) || 0;
  //   var totalAmount = allFood * foodCountValue;

  //   // Handling the wishCheckBox visibility and state
  //   if (totalAmount < 2499) {
  //     wishCheckBox.checked = false;
  //     $(".wishmsg").slideUp();
  //   }

  //   // Checking the photo checkbox
  //   if (photoCheckBox.checked) {
  //     netAmount.value = totalAmount + (foodCountValue * 5);
  //   } else {
  //     netAmount.value = totalAmount;
  //   }

  //   // Update the totalAmount field
  //   $("#totalamount").val(totalAmount);
  // }

  // // Initial call to updateAmounts
  // updateAmounts();


  // donate btn fixed  script
  window.addEventListener('scroll', function () {
    let donateBtn = document.getElementById('visitbtn');
    let form = document.querySelector('.form-1');
    let formBottom = form.offsetHeight + form.offsetTop;
    let scrollPosition = window.scrollY + window.innerHeight;

    // console.log(form.offsetHeight, form.offsetTop)
    // console.log(window.scrollY, window.innerHeight)

    if (scrollPosition >= (formBottom + 200)) {
      donateBtn.classList.add('visitbtn')

    } else {
      donateBtn.classList.remove('visitbtn')
    }


  });
    
  

});

// country code
// -----Country Code Selection
$("#vol-mob").intlTelInput({
  initialCountry: "in",
  separateDialCode: true,
  // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});

$("#vol2-mob").intlTelInput({
  initialCountry: "in",
  separateDialCode: true,
  // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});

$("#donorMob").intlTelInput({
  initialCountry: "in",
  separateDialCode: true,
  // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});

$("#edu_donor_mob").intlTelInput({
  initialCountry: "in",
  separateDialCode: true,
  // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});

$("#orph_mob").intlTelInput({
  initialCountry: "in",
  separateDialCode: true,
  // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});

$("#orph_groc_mob").intlTelInput({
  initialCountry: "in",
  separateDialCode: true,
  // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});
















