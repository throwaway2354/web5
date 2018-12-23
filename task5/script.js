$.fn.immediateText = function() {
    return this.contents().not(this.children()).text();
};

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
  var li = $('<li></li>').text(template.text);
  if (template.children) {
    var newUl = $('<ul></ul>');
    for (child of template.children) {
      makeElements(child, newUl);
    }
    $(li).append(newUl);
  }
  $(ul).append(li);
}

var ul = $('<ul></ul>');
for (child of m) {
  makeElements(child, ul);
}
$('body').append(ul);

$('li').each(function() {
  console.log($(this).immediateText(), $(this).find('li').length);
});

$('ul').click(function(e) {
  $(e.target).children().slideToggle('slow');
  e.stopPropagation();
});
