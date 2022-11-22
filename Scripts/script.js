let alphaRegex = /^[a-zA-Z]*$/;

let sportPositions = [
    ["Baseball", ["Catcher", "Pitcher", "Infielder", "Outfielder", "I just like to hit"]],
    ["Football", ["Quaterback", "Runningback", "Linemen", "Defensive Back", "Wide Reciever"]],
    ["Basketball", ["Point Guard", "Power Forward", "Center", "Shooting Guard", "Small Forward"]],
    ["Tennis", ["Doubles", "Singles"]],
    ["Other", ["Rugby", "Cricket", "Water Polo", "Lacrosse", "Hockey"]],

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

$("#sportName").on("change", function (e) {
    //enables the sport position dropdown
    $("#sportPosition").prop("disabled", false);

    let inputVal = this.value;

    // console.log(inputVal);

    //loop though array of sport positions
    $.each(sportPositions, function (key, value) {
        //match sport position to user selected
        if (inputVal === value[0]) {
            // console.log(value[0] + key + value);
            $.each(value, function (nestKey, nestValue) {
                // console.log(nestKey);

                switch (nestKey) {
                    case 0:
                        $("label[for=sportPosition]").text(nestValue);
                        $("#sportPosition").empty();
                        $("#sportPosition").append(
                            $("<option>").text(`select a ${nestValue} `)
                        );
                        break;
                    case 1:
                        $.each(nestValue, function (nameKey, nameValue) {
                            console.log(nameKey, nameValue);

                            $("#sportPosition").append(
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


//Check for file open or not for favorite chips
$("#chips").click(function () {
    $("#div1").load("FavChips.txt", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success")
            alert("External content loaded successfully!");
        if (statusTxt == "error")
            alert("Error " + xhr.status + ": File not loaded");
    });
});