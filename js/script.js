/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
'use strict'
document.addEventListener('DOMContentLoaded', () => {
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const   adv = document.querySelector('.promo__adv'),
            bg = document.querySelector('.promo__bg'),
            genre = bg.querySelector('.promo__genre'),
            moviesList = document.querySelector('.promo__interactive-list'),
            add = document.querySelector('form.add'),
            addbutton = add.querySelector('button'),
            nameFilm = add.querySelector('.adding__input'),
            checkbox = add.querySelector('[type="checkbox"]');
    
    const sortArr = (arr) => {
        arr.sort();
    };

    add.addEventListener('submit', (event) => {
        
        event.preventDefault();
        
        let newFilm = nameFilm.value;
        let favorite = checkbox.checked;
        
        if (newFilm) {
            
            if (favorite) {
                console.log("Добавляем любимый фильм");
            };
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            };

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            // nameFilm.value = '';
            movieListDisplay(movieDB.movies, moviesList);
        };
        // Этот резет сбрасывает ввденно название фильма и галочку любимый
        event.target.reset();
    });
    
    const deleteAdv = (arr) => {
        arr.remove();
    };
    
    const makeChanges = () => {
        bg.style.backgroundImage = "url('img/bg.jpg')";
        genre.textContent = 'Драма';
    };
    
    function movieListDisplay(films, parent) {
        
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film,i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i +1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                films.splice(i, 1);
                movieListDisplay(films, parent);
            });
        });
    };
    
    deleteAdv(adv);
    makeChanges();
    movieListDisplay(movieDB.movies, moviesList);
    
    // addbutton.addEventListener('click', element => {
    //     element.preventDefault();
    //     movieDB.movies.push(nameFilm.value);
    //     nameFilm.value = '';
    //     movieListDisplay();
    // });
    
    
    // console.log(moviesList);
    
    // btns.forEach(btn => {
    //     btn.addEventListener('click', deleteElement, {once: true});
    // });
    
    // link.addEventListener('click', e => {
    //     e.preventDefault();
    //     console.log(e.target);
    // })
});
