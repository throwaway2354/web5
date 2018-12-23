var m = [
  {
    text: 'Животные',
    children: [
      {
        text: 'Млекопитающие',
        children: [
          { text: 'Коровы' },
          { text: 'Ослы' },
          { text: 'Собаки' },
          { text: 'Тигры' },
        ]
      },
      {
        text: 'Другие',
        children: [
          { text: 'Змеи' },
          { text: 'Птицы' },
          { text: 'Ящерицы' },
        ]
      },
    ]
  },
  {
    text: 'Рыбы',
    children: [
      {
        text: 'Аквариумные',
        children: [
          { text: 'Гуппи' },
          { text: 'Скалярии' },
        ]
      },
      {
        text: 'Морские',
        children: [
          { text: 'Морская форель' },
        ]
      },
    ]
  },
];

function makeElements(template, ul) {
  var li = ul.appendChild(document.createElement('li'));
  li.appendChild(document.createTextNode(template.text));
  if (template.children) {
    var newUl = li.appendChild(document.createElement('ul'));
    for (child of template.children) {
      makeElements(child, newUl);
    }
  }
}
var ul = document.body.appendChild(document.createElement('ul'));
for (child of m) {
  makeElements(child, ul);
}

