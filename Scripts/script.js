let alphaRegex = /^[a-zA-Z]*$/;

let drinkNames = [
    ["Water Brand", ["Fiji", "Smart Water", "Life Water", "Mountain Valley", "Auqafina", "Crystal Geyser"]],
    ["Soda", ["Coca Cola", "Dr Pepper", "Mountain Dew", "A & W", "Sprite"]],
    ["Juice", ["Apple", "Orange", "Grape", "Kool-aid"]],
    ["Energy Drink", ["Monster", "Red Bull", "Bang", "Reign"]],
    ["Sports Drink", ["Gatorade", "Powerade", "Pedialyte", "Propel", "Celsius"]],

];

$("#noSpaces").blur(function () {
    let inputVal = $(this).val();
    let strSpace = " ";
    let spaceCount = inputVal.split(" ").length - 1;

    console.log(spaceCount);
    if (spaceCount === 0) {
        $(this).next().text("Welcome");
    } else if (spaceCount > 0) {
        $(this).next().text("no spaces allowed in Name");
    }
});

$("#noAlpha").keyup(function (e) {
    e.preventDefault();
    this.value = this.value.replace(/[^0-9\.]/g, "");
    $(this).next().text("remember, no alpha!");
});

$("#noNumbers").on("input", function () {
    let inputVal = $(this).val();

    if (alphaRegex.test(inputVal)) {
        $(this).removeClass("error").addClass("success");
        $(this).next().text("super cool!");
    } else {
        $(this).removeClass("success").addClass("error");
        $(this).next().text("ah, farts!");
    }
});

$("#drinkType").on("change", function (e) {
    //enables the pet name dropdown
    $("#drinkName").prop("disabled", false);

    let inputVal = this.value;

    // console.log(inputVal);

    //loop though array of pet names
    $.each(drinkNames, function (key, value) {
        //match pet name to user selected
        if (inputVal === value[0]) {
            // console.log(value[0] + key + value);
            $.each(value, function (nestKey, nestValue) {
                // console.log(nestKey);

                switch (nestKey) {
                    case 0:
                        $("label[for=drinkName]").text(nestValue);
                        $("#drinkName").empty();
                        $("#drinkName").append(
                            $("<option>").text(`select a ${nestValue} `)
                        );
                        break;
                    case 1:
                        $.each(nestValue, function (nameKey, nameValue) {
                            console.log(nameKey, nameValue);

                            $("#drinkName").append(
                                $("<option>").val(nameValue).text(nameValue)
                            );
                        });
                        break;
                }
            });
        }
    });
});

console.log("user name: " + $("#noSpaces").val());


//Check for file open or not for favorite drinks
$("#drinks").click(function () {
    $("#div1").load("FavChips.txt", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success")
            alert("External content loaded successfully!");
        if (statusTxt == "error")
            alert("Error " + xhr.status + ": File not loaded");
    });
});