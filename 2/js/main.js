let btn = document.querySelector('button');

btn.addEventListener('click', function() {
    alert(`Ширина экрана: ${window.screen.width}
    Высота экроана: ${window.screen.height}
    Ширина вьюпорта с учётом полосы прокрутки: ${window.innerWidth}
    Высота вьюпорта с учётом полосы прокрутки: ${window.innerHeight}
    Ширина вьюпорта без учёта полосы прокрутки: ${document.documentElement.clientWidth}
    Высота вьюпорта без учёта полосы прокрутки: ${document.documentElement.clientHeight}`);
});