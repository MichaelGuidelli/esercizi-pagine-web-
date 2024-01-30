
var valore = 0;
document.querySelectorAll('button').forEach(tastoPremuto => {
    let id = tastoPremuto.getAttribute('id');

    tastoPremuto.addEventListener('click', function(){

        if (id === "decremento") {
            valore -= 1;

        } else if (id === "incremento") {
            valore += 1;

        } else {
            valore = 0;
        }

        console.log(valore)

        document.getElementById("counter").innerText = valore;

    });
});
