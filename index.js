// import {el, setChildren} from '../node_modules/redom/dist/redom.es.js';
import {el, setChildren} from 'redom';
import axios from 'axios';
import Navigo from 'navigo';

const router = new Navigo('/');
const URL = 'https://adventurous-fifth-hedge.glitch.me/api/';

const goodsDetailsPage = (id) => {
  const goods = el('div', 'Загрузка...');
  axios.get(`${URL}goods/${id}`)
      // .then(response => response.json())
      .then(({data: {title, description, price}}) => {
        setChildren(goods, [
          el('h1', title),
          el('p', description),
          el('p', `Цена: ${price} руб.`),
          el('a', {
            href: '/',
            onclick(event) {
              event.preventDefault();
              router.navigate(event.target.getAttribute('href'));
            },
          }, 'Вернуться на главную'),
        ]);
      });
  return el('div', {className: 'container'},
      [el('h1', 'Карточка товара'), goods]);
}
;

const goodsListPage = () => {
  const list = el('ul', el('li', 'Загрузка...'));
  axios.get(`${URL}goods`)
      // .then(response => response.json())
      .then(({data}) => {
        setChildren(list, data.map(({id, title}) =>
          el('li', el('a', {
            href: `/goods/${id}`,
            onclick(event) {
              event.preventDefault();
              router.navigate(event.target.getAttribute('href'));
            },
          }, title))));
      });

  return el('div', {className: 'container'},
      [el('h1', 'Товары'), list]);
};

router.on('/', () => {
  setChildren(document.body, goodsListPage());
});

router.on('/goods/:id', ({data: {id}}) => {
  setChildren(document.body, goodsDetailsPage(id));
});

router.resolve();
