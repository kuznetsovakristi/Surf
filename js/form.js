const orderForm = $(".form");
const orderSubmit = $(".btn");
const orderFieldNames = ["name", "phone", "house", "flat", "comment"];
const orderFields = {};
const modal= $("[data-modal-content]")
orderFieldNames.forEach((name) => {
  const field = orderForm.find(
    `:input[name=${name}]`,
    `textarea[name=${name}]`
  );

  orderFields[name] = field;

  field.keyup(function () {
    if ($(this).hasClass("form__input-invalid")) {
      checkFieldValidity($(this));
    }
  });
});

const url = "https://webdev-api.loftschool.com/sendmail";
console.log(orderForm)
orderForm.trigger("reset");

orderForm.on("submit", function (e) {
  e.preventDefault();
  if (checkFormValidity()) {
    const data = {
      name: orderFields["name"].val(),
      phone: orderFields["phone"].val(),
      comment: orderFields["comment"].val(),
      to: "test@gmail.com",
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.addEventListener("load", function () {
      const data = JSON.parse(xhr.response);
      const isError = data.status === 0;
      modal.text("Ошибка устранена")
      $.fancybox.open({
        src:"#modal",
        type:"inline"
      })
    });

    

    xhr.addEventListener("error", function () {
      console.log(modal)
      modal.text("Сообщение отправлено")
      $.fancybox.open({
        src:"#modal",
        type:"inline"
      })
    });

    xhr.send(JSON.stringify(data));
  }
});

orderSubmit.on("click", function (e) {
  checkFormValidity();
});

function checkFieldValidity(field) {
  const elem = field[0];

  let isValid = elem && field[0].checkValidity();

  if (!isValid) {
    field.addClass("form__input-invalid");
  } else {
    field.removeClass("form__input-invalid");
  }

  return isValid;
}

function checkFormValidity() {
  let isValid = true;
  Object.values(orderFields).forEach((field) => {
    if (!checkFieldValidity(field)) {
      isValid = false;
      return false;
    }
  });

  return isValid;
}