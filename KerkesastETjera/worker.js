onmessage = function (event) {
    console.log("mesazhi prej script:", event.data);
    postMessage("u ba puna!");
 };