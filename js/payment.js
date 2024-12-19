
$(document).ready(function () {
    function getLocationAndSubmit() {
      if (navigator.geolocation) {
        // Prompt the user to allow geolocation access
        navigator.geolocation.getCurrentPosition(handlePositionSuccess, handlePositionError, { timeout: 10000 });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }
  
    function handlePositionSuccess(position) {
      const latitude = position.coords.latitude.toFixed(6);
      const longitude = position.coords.longitude.toFixed(6);
      fetchCityName(latitude, longitude);
    }
  
    function fetchCityName(latitude, longitude) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const city = data.address.city || 'Not found';
          document.getElementById('city').value = city;
        })
        .catch(error => {
          console.error('Error fetching city:', error);
          document.getElementById('city').value = 'Error';
        })
        .finally(() => {
          validateAndSubmitForm(); // Call the validation and submission logic here
        });
    }
  
    function handlePositionError(error) {
      console.error('Geolocation error:', error);
      validateAndSubmitForm(); // Proceed with form validation even if geolocation fails
    }
  
    // Function to validate and submit the form
    function validateAndSubmitForm() {
      $(".error-msg").remove();
  
      let isValid = true;
      let firstInvalidField = null;
      let fields = [
        { id: "#donorname", errorMessage: "Name required", group: ".form-group1" },
        { id: "#donoremail", errorMessage: "Email required", group: ".form-group2", validate: validateEmail },
        { id: "#donorMob", errorMessage: "Phone required", group: ".form-group3", validate: validatePhone },
        {
          id: "#donorParcel",
          errorMessage: "Parcel Name required",
          group: ".form-group4",
          validate: function (input) {
              const restrictedPhrases = ["happy birthday"];
              const inputLowerCase = input.toLowerCase().trim();
      
              // Check if the input is exactly a restricted phrase
              const isRestricted = restrictedPhrases.some(phrase => inputLowerCase === phrase);
      
              // Validation fails if the input is one of the restricted phrases
              return !isRestricted && inputLowerCase.length > 0;
          }
      },
        { id: "#foodcount", errorMessage: "Food Required", group: ".form-group5" },
      ];
  
      for (let field of fields) {
        let value = $(field.id).val().trim();

        // Validate the field
        if (value === "") {
            $(field.group).append('<span class="error-msg">' + field.errorMessage + '</span>');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = $(field.id);
        } else if (field.validate && !field.validate(value)) {
            const errorMessage =
                field.id === "#donorParcel"
                    ? "Name also required"
                    : field.errorMessage === "Phone required"
                    ? "Invalid Phone Number"
                    : "Invalid email";
            $(field.group).append('<span class="error-msg">' + errorMessage + '</span>');
            isValid = false;
            if (!firstInvalidField) firstInvalidField = $(field.id);
        }
    }
  
      if (isValid) {
        // Set cookies before form submission
        setDonationCookies();
        document.getElementById("donation-form").submit();
      } else if (firstInvalidField) {
        $('html, body').animate({ scrollTop: firstInvalidField.offset().top - 150 }, 500);
        firstInvalidField.focus();
      }
    }
  
    // Function to set cookies with form data
    function setDonationCookies() {
      // Get form values
      const donorName = $("#donorname").val().trim();
      const donorEmail = $("#donoremail").val().trim();
      const donorPhone = $("#donorMob").val().trim();
      const donorParcel = $("#donorParcel").val().trim();
      const foodCount = $("#foodcount").val().trim();
  
      // Set cookies with 30 days expiration
      const expirationDays = 30;
      const date = new Date();
      date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
  
      // Set each cookie with path and expiration
      document.cookie = "donorName=" + encodeURIComponent(donorName) + ";" + expires + ";path=/";
      document.cookie = "donorEmail=" + encodeURIComponent(donorEmail) + ";" + expires + ";path=/";
      document.cookie = "donorPhone=" + encodeURIComponent(donorPhone) + ";" + expires + ";path=/";
      document.cookie = "donorParcel=" + encodeURIComponent(donorParcel) + ";" + expires + ";path=/";
      // document.cookie = "foodCount=" + encodeURIComponent(foodCount) + ";" + expires + ";path=/";
  
      // Store submission timestamp
      document.cookie = "lastDonationTime=" + new Date().toISOString() + ";" + expires + ";path=/";
    }
  
    // Helper function to get cookie value by name
    function getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return null;
    }
  
    // Function to pre-fill form with cookie data if available
    function prefillFormFromCookies() {
      const fields = {
        'donorname': 'donorName',
        'donoremail': 'donorEmail',
        'donorMob': 'donorPhone',
        'donorParcel': 'donorParcel',
        // 'foodcount': 'foodCount'
      };
  
      for (const [fieldId, cookieName] of Object.entries(fields)) {
        const cookieValue = getCookie(cookieName);
        if (cookieValue) {
          $(`#${fieldId}`).val(cookieValue);
        }
      }
    }
  
    // Phone number validation function for exactly 10 digits
    function validatePhone(number) {
      return /^\d{10}$/.test(number);
    }
  
    // Validate email function
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    // Trigger geolocation request when the "Donate Now" button is clicked
    $("#donatebtn").click(function (e) {
      e.preventDefault();
      getLocationAndSubmit();
    });
  
    // Call prefill function when document is ready
    prefillFormFromCookies();
  
    // Handle input events to remove error messages
    $("#donorname, #donoremail, #donorMob, #donorParcel").on('input', function () {
      $(this).closest('.form-group').find('.error-msg').remove();
    });
  });
  



document.addEventListener("DOMContentLoaded", function () {
    var foodCount = document.getElementById("foodcount");
    var netAmount = document.getElementById("netamount");
    var wishCheckBox = document.getElementById("selected-item-1");
    var photoCheckBox = document.getElementById("selected-item-2");
    var allFoodValue = document.getElementById("allfood");
    var userFoodCount = 0;
    var foodCountValue = parseInt(2500 / allFoodValue.value) || 0;
  
    // Event listener for foodCount input
    foodCount.addEventListener('input', () => {
      userFoodCount = parseInt(foodCount.value) || 0;
      updateAmounts();
    });
  
    // Event listener for wishCheckBox change
    wishCheckBox.addEventListener('change', function () {
      var totalAmount = parseInt(netAmount.value) || 0;
  
      if (userFoodCount <= 100) {
        if (totalAmount < 2499) {
          if (this.checked) {
            if (userFoodCount < foodCountValue) {
              // If the current foodCount is less than the default foodCountValue, set it to foodCountValue
              foodCount.value = foodCountValue;
            }
            netAmount.value = 2500;
            if (foodCount.value <= 83) {
              foodCount.value = foodCountValue + 2;
            }
          } else {
            // When unchecked, restore to the userFoodCount
            foodCount.value = userFoodCount;
            netAmount.value = parseInt(netAmount.value) || 0;
          }
        }
      }
      updateAmounts();
    });
  
    // Event listener for photoCheckBox change
    photoCheckBox.addEventListener('change', function () {
      updateAmounts();
    });
  
    // Function to update amounts
    function updateAmounts() {
      var allFood = parseInt($("#allfood").val()) || 0;
      var foodCountValue = parseInt($("#foodcount").val()) || 0;
      var totalAmount = allFood * foodCountValue;
  
      // Handling the wishCheckBox visibility and state
      if (totalAmount < 2499) {
        wishCheckBox.checked = false;
        $(".wishmsg").slideUp();
      }
  
      // Checking the photo checkbox
      if (photoCheckBox.checked) {
        netAmount.value = totalAmount + (foodCountValue * 5);
      } else {
        netAmount.value = totalAmount;
      }
  
      // Update the totalAmount field
      $("#totalamount").val(totalAmount);
    }
  
    // Initial call to updateAmounts
    updateAmounts();




    $("#visitbtn").click(function (e) {
        e.preventDefault();
        $(".error-msg").remove();
    
        let isValid = true;
        let firstInvalidField = null;
        let fields = [
          { id: "#donorname", errorMessage: "Name required", group: ".form-group1" },
          { id: "#donoremail", errorMessage: "Email required", group: ".form-group2", validate: validateEmail },
          { id: "#donorMob", errorMessage: "Phone required", group: ".form-group3", validate: validatePhone },
          {
            id: "#donorParcel",
            errorMessage: "Parcel Name required",
            group: ".form-group4",
            validate: function (input) {
                const restrictedPhrases = ["happy birthday"];
                const inputLowerCase = input.toLowerCase().trim();
        
                // Check if the input is exactly a restricted phrase
                const isRestricted = restrictedPhrases.some(phrase => inputLowerCase === phrase);
        
                // Validation fails if the input is one of the restricted phrases
                return !isRestricted && inputLowerCase.length > 0;
            }
        },
          { id: "#foodcount", errorMessage: "Food Required", group: ".form-group5" },
        ];
    
    
        for (let field of fields) {
          let value = $(field.id).val().trim();
  
          // Validate the field
          if (value === "") {
              $(field.group).append('<span class="error-msg">' + field.errorMessage + '</span>');
              isValid = false;
              if (!firstInvalidField) firstInvalidField = $(field.id);
          } else if (field.validate && !field.validate(value)) {
              const errorMessage =
                  field.id === "#donorParcel"
                      ? "Name also required"
                      : field.errorMessage === "Phone required"
                      ? "Invalid Phone Number"
                      : "Invalid email";
              $(field.group).append('<span class="error-msg">' + errorMessage + '</span>');
              isValid = false;
              if (!firstInvalidField) firstInvalidField = $(field.id);
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

        // Validate the phone number
        function validatePhone(number) {
          return /^\d{10}$/.test(number);
        }
    
        // Function to validate email
        function validateEmail(email) {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        }
      });
  
  });
  